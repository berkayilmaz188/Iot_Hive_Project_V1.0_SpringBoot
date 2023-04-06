import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import { PostWithAuth } from '../../services/HttpService';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Auth() {
  const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (value) => {
        setUsername(value)
    } 

    const handlePassword = (value) => {
        setPassword(value)
    } 

    const sendRequest = (path) => {
        PostWithAuth(("/auth/"+path), {
            username : username, 
            password : password,
          })
          .then((response) => response.json())
          .then((result) => {localStorage.setItem("tokenKey",result.accessToken);
                            localStorage.setItem("refreshKey",result.refreshToken);
                            localStorage.setItem("currentUser",result.userId);
                            localStorage.setItem("userName",result.username)})
                            .then(result => {
                              console.log("result", result);
                            })
          .catch((err) => console.log(err))
          navigate("/login")
    }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        console.log(localStorage)
      
    }

    const handleSonuc = () => {
      console.log(localStorage.getItem("accessToken"))
    }

    
return(
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username"
        onChange={ (i) => handleUsername(i.target.value)}/>
        <Form.Text className="text-muted" >
          Please begin your Username 
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        onChange={ (i) => handlePassword(i.target.value)}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick= {() => handleButton("register")}>
        Register
      </Button>
      
    </Form>
    
)
}

export default Auth;