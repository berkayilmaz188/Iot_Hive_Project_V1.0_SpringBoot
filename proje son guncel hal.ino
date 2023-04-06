#include <Arduino.h>
#include <Hash.h>

#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include "MQ135.h"

#include <HX711_ADC.h>
#if defined(ESP8266)|| defined(ESP32) || defined(AVR)
#include <EEPROM.h>
#endif

const int HX711_dout = D5; //mcu > HX711 dout pin
const int HX711_sck = D6; //mcu > HX711 sck pin
 

#define anInput A0  
const byte RX = D7;
const byte TX = D8;
HX711_ADC LoadCell(HX711_dout, HX711_sck);
const int calVal_eepromAdress = 0;
unsigned long t = 0;

const char* wlan_ssid             = "iPhone 13 Pro Max";
const char* wlan_password         = "Be414141";
const char* ws_host               = "45.136.4.151";
const int   ws_port               = 8080;
const int ANALOGPIN=A0;
MQ135 gasSensor = MQ135 (ANALOGPIN);
String roomName = "message";
String senderName = "Berkay esp32";

int i = 0;

String temp = "";



SoftwareSerial mySerial = SoftwareSerial(RX, TX);

String softwareSerialData = "";
char character;

// base URL for SockJS (websocket) connection
// The complete URL will look something like this(cf. http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-36):
// ws://<ws_host>:<ws_port>/<ws_baseurl>/<3digits>/<randomstring>/websocket
// For the default config of Spring's SockJS/STOMP support, the default base URL is "/socketentry/".
const char* ws_baseurl            = "/ws/"; // don't forget leading and trailing "/" !!!
//agirlik sensor kalibre
float calibration_factor = 15000;

WebSocketsClient webSocket;

long lastUART = 0;
//void Read_Uart();    // UART STM
String LED1 = "OFF", LED2 = "OFF";


void setup()
{
  Serial.begin(9600);
  mySerial.begin(115200);
  connectToWifi();
  connectToWebSocket();

  Serial.println("UART Start");

  lastUART = millis();

  LoadCell.begin();
  unsigned long stabilizingtime = 2000; // preciscion right after power-up can be improved by adding a few seconds of stabilizing time
  boolean _tare = true;
}

void loop() {
  webSocket.loop();
  Read_Uart();
  if (millis() - lastUART > 1000)
  {
    mySerial.print("1ON2ON3OFF4");
    //Serial.println("Truyen : 1ON2ON3OFF4");
    lastUART = millis();
  }
  GazSensor();


  AgirlikSensor();
  
  //serialGetData();

  //sendMessage(roomName, senderName, st, "MESSAGE");




  
}
void Read_Uart()
{

  String st = "";
  String sicaklik;


  while (mySerial.available())
  {
    sicaklik = mySerial.readStringUntil('\n');
    int myInt = sicaklik.toInt();
    String agir;
    agir = String(myInt);
    char inChar = (char)mySerial.read();
    st +=  inChar;
  //  if (inChar == '%d')
  //  {
      //Serial.println("Nhan : " + sicaklik);
      sendMessage3(roomName, senderName, agir, "MESSAGE");
      break;
    
//  }
  }

temp = sicaklik; 
}
void GazSensor(){
  float rzero = gasSensor.getRZero();
    String hava = String(rzero, 2);
  //Serial.println(hava);
  sendMessage(roomName, senderName, hava, "HAVA");
}

void AgirlikSensor(){
 static boolean newDataReady = 0;
  const int serialPrintInterval = 0; //increase value to slow down serial print activity

  // check for new data/start next conversion:
  if (LoadCell.update()) newDataReady = true;

  // get smoothed value from the dataset:
  if (newDataReady) {
    if (millis() > t + serialPrintInterval) {
      float i = LoadCell.getData();
      String agrr = String(i, 0);
      Serial.print("Load_cell output val: ");
      Serial.println(i);
      sendMessage2(roomName, senderName, agrr, "AGIRLIKKK");
      newDataReady = 0;
      t = millis();
    }
  }

  // receive command from serial terminal
  if (Serial.available() > 0) {
    char inByte = Serial.read();
    if (inByte == 't') LoadCell.tareNoDelay(); //tare
    else if (inByte == 'r') calibrate(); //calibrate
    else if (inByte == 'c') changeSavedCalFactor(); //edit calibration value manually
  }

  // check if last tare operation is complete
  if (LoadCell.getTareStatus() == true) {
    Serial.println("Tare complete");
  }

}




void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

  switch (type) {
    case WStype_DISCONNECTED:
      Serial.printf("[WSc] Disconnected!\n");
      connectToWebSocket();
      break;
    case WStype_CONNECTED:
      {
        Serial.printf("[WSc] Connected to url: %s\n",  payload);
      }
      break;
    case WStype_TEXT:
      {

        String text = (char*) payload;
        if (payload[0] == 'h') {

          Serial.println("Heartbeat!");

        } else if (payload[0] == 'o') {

          // on open connection
          char *msg = "[\"CONNECT\\naccept-version:1.1,1.0\\nheart-beat:10000,10000\\n\\n\\u0000\"]";
          webSocket.sendTXT(msg);
            Serial.println("Baglanti basardi");
          delay(1000);


        } else if (text.startsWith("a[\"CONNECTED")) {

          // subscribe to some channels
          subscribeToChannel(roomName);
          delay(1000);
          //sendMessage(roomName, senderName, senderName + " connected to hive network", "MESSAGE");
          //sendMessage(roomName, senderName, "Hello guys, this is esp32!", "MESSAGE");

        }
        //else if (text.startsWith("a[\"MESSAGE")) {
         // processJsonData(text);
       // }
        break;
      }
    case WStype_BIN:
      Serial.printf("[WSc] get binary length: %u\n", length);
      hexdump(payload, length);
      break;
  }

}


String str;

void serialGetData() {


  
  if (mySerial.available() > 0)
  {
    str = mySerial.readStringUntil('\n');
    if (str.length() > 0) {
      str =  str.substring(0, str.length() - 1);
      str.replace("\\", "");
      //Serial.println(str);
      sendMessage(roomName, senderName, String(str), "MESSAGE");
    }
  }
  delay(2000);

}

void subscribeToChannel(String _channelName) {
  String msg = "[\"SUBSCRIBE\\nid:sub-0\\ndestination:/chatroom/public\\n\\n\\u0000\"]";
  webSocket.sendTXT(msg);
}

void sendMessage(String _channelName, String _senderName, String _message, String _status) {
  String messageData =  "[\"SEND\\ndestination:/app/" +
                        _channelName + "\\n\\n{\\\"senderName\\\":\\\"" +
                        _senderName + "\\\",\\\"message\\\":\\\"" +
                        _message + "\\\",\\\"status\\\":\\\"" +
                        _status + "\\\"}\\u0000\"]";
  //Serial.println(messageData);
  webSocket.sendTXT(messageData);
}
void sendMessage2(String _channelName, String _senderName, String _message, String _status) {
  String messageData2 =  "[\"SEND\\ndestination:/app/" +
                        _channelName + "\\n\\n{\\\"senderName\\\":\\\"" +
                        _senderName + "\\\",\\\"message\\\":\\\"" +
                        _message + "\\\",\\\"status\\\":\\\"" +
                        _status + "\\\"}\\u0000\"]";
  //Serial.println(messageData);
  webSocket.sendTXT(messageData2);
}
void sendMessage3(String _channelName, String _senderName, String _message, String _status) {
  String messageData3 =  "[\"SEND\\ndestination:/app/" +
                        _channelName + "\\n\\n{\\\"senderName\\\":\\\"" +
                        _senderName + "\\\",\\\"message\\\":\\\"" +
                        _message + "\\\",\\\"status\\\":\\\"" +
                        _status + "\\\"}\\u0000\"]";
  //Serial.println(messageData);
  webSocket.sendTXT(messageData3);
}

/*void processJsonData(String _received) {
  String json = extractString(_received);
  json.replace("\\", "");
  Serial.println(json);
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, json);
  JsonObject obj = doc.as<JsonObject>();
  String receivedMessage = obj["message"];
  String username = obj["username"];
  Serial.println(receivedMessage);
  // send data to another arduino
  Serial.println(receivedMessage);

}*/

String extractString(String _received) {
  char startingChar = '{';
  char finishingChar = '}';

  String tmpData = "";
  bool _flag = false;
  for (int i = 0; i < _received.length(); i++) {
    char tmpChar = _received[i];
    if (tmpChar == startingChar) {
      tmpData += startingChar;
      _flag = true;
    }
    else if (tmpChar == finishingChar) {
      tmpData += finishingChar;
      break;
    }
    else if (_flag == true) {
      tmpData += tmpChar;
    }
  }

  return tmpData;

}

void connectToWifi() {
  delay(500);
  Serial.print("Logging into WLAN: "); Serial.print(wlan_ssid); Serial.print(" ...");
  WiFi.mode(WIFI_STA);
  WiFi.begin(wlan_ssid, wlan_password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" success.");
  Serial.print("IP: "); Serial.println(WiFi.localIP());
}

void connectToWebSocket() {
  String socketUrl = ws_baseurl;
  socketUrl += random(0, 999);
  socketUrl += "/";
  socketUrl += random(0, 999999); // should be a random string, but this works (see )
  socketUrl += "/websocket";
  Serial.println(ws_host + String(ws_port) + socketUrl);

  // connect to websocket
  webSocket.begin(ws_host, ws_port, socketUrl);
  webSocket.setExtraHeaders();
  //    webSocket.setExtraHeaders("foo: I am so funny\r\nbar: not"); // some headers, in case you feel funny
  webSocket.onEvent(webSocketEvent);
  Serial.println("Baglanti ilk adimi");
}

void calibrate() {
  Serial.println("***");
  Serial.println("Start calibration:");
  Serial.println("Place the load cell an a level stable surface.");
  Serial.println("Remove any load applied to the load cell.");
  Serial.println("Send 't' from serial monitor to set the tare offset.");

  boolean _resume = false;
  while (_resume == false) {
    LoadCell.update();
    if (Serial.available() > 0) {
      if (Serial.available() > 0) {
        char inByte = Serial.read();
        if (inByte == 't') LoadCell.tareNoDelay();
      }
    }
    if (LoadCell.getTareStatus() == true) {
      Serial.println("Tare complete");
      _resume = true;
    }
  }

  Serial.println("Now, place your known mass on the loadcell.");
  Serial.println("Then send the weight of this mass (i.e. 100.0) from serial monitor.");

  float known_mass = 0;
  _resume = false;
  while (_resume == false) {
    LoadCell.update();
    if (Serial.available() > 0) {
      known_mass = Serial.parseFloat();
      if (known_mass != 0) {
        Serial.print("Known mass is: ");
        Serial.println(known_mass);
        _resume = true;
      }
    }
  }

  LoadCell.refreshDataSet(); //refresh the dataset to be sure that the known mass is measured correct
  float newCalibrationValue = LoadCell.getNewCalibration(known_mass); //get the new calibration value

  Serial.print("New calibration value has been set to: ");
  Serial.print(newCalibrationValue);
  Serial.println(", use this as calibration value (calFactor) in your project sketch.");
  Serial.print("Save this value to EEPROM adress ");
  Serial.print(calVal_eepromAdress);
  Serial.println("? y/n");

  _resume = false;
  while (_resume == false) {
    if (Serial.available() > 0) {
      char inByte = Serial.read();
      if (inByte == 'y') {
#if defined(ESP8266)|| defined(ESP32)
        EEPROM.begin(512);
#endif
        EEPROM.put(calVal_eepromAdress, newCalibrationValue);
#if defined(ESP8266)|| defined(ESP32)
        EEPROM.commit();
#endif
        EEPROM.get(calVal_eepromAdress, newCalibrationValue);
        Serial.print("Value ");
        Serial.print(newCalibrationValue);
        Serial.print(" saved to EEPROM address: ");
        Serial.println(calVal_eepromAdress);
        _resume = true;

      }
      else if (inByte == 'n') {
        Serial.println("Value not saved to EEPROM");
        _resume = true;
      }
    }
  }

  Serial.println("End calibration");
  Serial.println("***");
  Serial.println("To re-calibrate, send 'r' from serial monitor.");
  Serial.println("For manual edit of the calibration value, send 'c' from serial monitor.");
  Serial.println("***");
}

void changeSavedCalFactor() {
  float oldCalibrationValue = LoadCell.getCalFactor();
  boolean _resume = false;
  Serial.println("***");
  Serial.print("Current value is: ");
  Serial.println(oldCalibrationValue);
  Serial.println("Now, send the new value from serial monitor, i.e. 696.0");
  float newCalibrationValue;
  while (_resume == false) {
    if (Serial.available() > 0) {
      newCalibrationValue = Serial.parseFloat();
      if (newCalibrationValue != 0) {
        Serial.print("New calibration value is: ");
        Serial.println(newCalibrationValue);
        LoadCell.setCalFactor(newCalibrationValue);
        _resume = true;
      }
    }
  }
  _resume = false;
  Serial.print("Save this value to EEPROM adress ");
  Serial.print(calVal_eepromAdress);
  Serial.println("? y/n");
  while (_resume == false) {
    if (Serial.available() > 0) {
      char inByte = Serial.read();
      if (inByte == 'y') {
#if defined(ESP8266)|| defined(ESP32)
        EEPROM.begin(512);
#endif
        EEPROM.put(calVal_eepromAdress, newCalibrationValue);
#if defined(ESP8266)|| defined(ESP32)
        EEPROM.commit();
#endif
        EEPROM.get(calVal_eepromAdress, newCalibrationValue);
        Serial.print("Value ");
        Serial.print(newCalibrationValue);
        Serial.print(" saved to EEPROM address: ");
        Serial.println(calVal_eepromAdress);
        _resume = true;
      }
      else if (inByte == 'n') {
        Serial.println("Value not saved to EEPROM");
        _resume = true;
      }
    }
  }
  Serial.println("End change calibration value");
  Serial.println("***");
}

