# Youtube Trailer

[![Youtube Trailer](https://img.youtube.com/vi/VZfeQSmh-bA/maxresdefault.jpg)](https://youtu.be/VZfeQSmh-bA?si=ORhVqNmPamjv0LjB)

Description: Click on the image above or [this link](https://youtu.be/VZfeQSmh-bA?si=ORhVqNmPamjv0LjB) to watch the introduction video of our project.

# Description

The backend is created using Java Spring Boot.
The frontend is built using React.js.
Material components are created using Bootstrap React.

MongoDB is used as the database.

Esp32 and Stm32 are utilized.
DHT11 sensors are operated with Stm32, and data is sent to Esp32 via UART to enable internet access.

Communication between Esp32 and Spring Boot (backend) is established using the WebSocket protocol.
WebSockets are created using SockJS and Stomp libraries.

The React interface communicates with the backend using WebSocket to receive real-time data.

The project is deployed by me to an Ubuntu 20.04 server using Docker and Nginx.

Mongo:4.2.3 version is running via Docker.

The project development process took place between October 15, 2022, and January 10, 2023.
The domain www.beehiliv.com.tr and the Ubuntu hosting have expired due to a one-year timeframe.

# Description Turkish 

Backend java springboot kullanılarak oluşturulmuştur.
Frontend: React.js kullanılarak oluşturulmuştur. 
Bootstrap React kullanılarak materiyallar oluşturulmuştur.

Database MongoDB kullanılmıştır.

Esp32 ve Stm32 kullanılmıştır.
Stm32 ile DHT11 sensörleri çalıştırılmış ve uart ile veriler esp32'ye gönderilerek internete çıkışı sağlanmıştır.

Esp32 ile springboot(backend) websocket protokolü ile haberleşmektedir.
SockJS ve Stomp kütüphaneleri kullanılarak websocket oluşturulmuştur. 

React arayüzü ile backend'de verilerin real-time gelmesi için websocket ile haberleşmektedir.

Proje ubuntu 20.04 sunucuya docker ve nginx kullanılarak tarafımca deploy edilmiştir.

Mongo:4.2.3 sürümü docker üzerinden çalıştırılarak kullanılmaktadır.

Proje geliştirme süreci 15.10.2022 - 10-01.2023 tarihleri arasındadır.
www.beehiliv.com.tr alan adı ve ubuntu hosting süresi 1 yıllık olduğu için zaman aşımına uğradı.
