
import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {Stomp} from "stompjs";
import { useLocation } from 'react-router-dom';



var stompClient =null;
const Chat= () => {
    const jwtToken = localStorage.getItem("JWTAccessKey");
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]);
    const [co2degeri, setco2degeri] = useState([]); 
    const [nemdegeri, setnemdegeri] = useState([]); 
    const [agirlikdegeri, setAgirlikdegeri] = useState([]);
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: localStorage.getItem("username"),
        receivername: '',
        connected: false,
        message: ''
      });
    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://45.136.4.151:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
            case "HAVA":
                co2degeri.push(payloadData);
                setco2degeri([...co2degeri]);
                break;    
            case "HUM":
                nemdegeri.push(payloadData);
                setnemdegeri([...nemdegeri]);
                break;
            case "AGIRLIKKK":
                agirlikdegeri.push(payloadData);
                setco2degeri([...agirlikdegeri]);
                break;       
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
        <div className="container">
        {userData.connected?
        
        <div className="chat-box">
            <div className="member-list">
                <ul>
                <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
            <h6 className="my-0">Hava-Nem</h6>
              <small className="text-muted">Sıcaklıgi/Orani</small>
            </div>
            {publicChats.map((chat,index)=>(
                <li className={`messagetemp ${chat.senderName === userData.username && "self"}`} key={index}>
            <span className="text-muted">{chat.message}</span></li>))}
          </li>

          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">Hava Kalitesi</h6>
              <small className="text-muted">PPM</small>
            </div>
            {co2degeri.map((chat,index)=>(
                <li className={`messagehava ${chat.senderName === userData.username && "self"}`} key={index}>
            <span className="text-muted">{chat.message}</span></li>))}
          </li>
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div className="text-success">
              <h6 className="my-0">Agirlik Degeri</h6>
              <small>KG</small>
            </div>
            {agirlikdegeri.map((chat,index)=>(
                <li className={`messageagirlik ${chat.senderName === userData.username && "self"}`} key={index}>
            <span className="text-success">{chat.message}</span></li>))}
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Hava Durumu</span>
            <strong>IYI</strong>
          </li>
        </ul>
                </ul>
            </div>
           
        </div>
        :
        <div className="register">
            
              <button type="button" onClick={registerUser}>
                    Ari kovanina baglanmak icin tiklayin.
              </button> 
        </div>}
    </div>
    
    )
}

export default Chat
