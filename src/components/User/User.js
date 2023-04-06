import ListGroup from 'react-bootstrap/ListGroup';
import Placeholder from 'react-bootstrap/Placeholder';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import React from 'react';

function User() {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [newusername, setNewUsername] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleNewUsername = (value) => {
    setNewUsername(value)
} 

const handleNewPassword = (value) => {
    setNewPassword(value)
} 

    const usern = localStorage.getItem("username")
    const jwtToken = localStorage.getItem("JWTAccessKey")

    const DeleteUser = () => {
      fetch("/api/users/"+ localStorage.getItem("userId"), {
          method: "DELETE",
          headers: {
              "Authorization": `Bearer ${jwtToken}`
          },
      })
    localStorage.removeItem("JWTAccessKey")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    localStorage.removeItem("JWTRefreshKey")
      navigate("/")
      window.location.reload()
      
  }

  const sendUpdate = () => {
     fetch("/api/users/"+localStorage.getItem("userId"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
    },
    body: JSON.stringify({
      username : newusername,
      password : newpassword,
  }),
      })
      .then((response) => response.json())
      .catch((err) => console.log(err))
    localStorage.removeItem("JWTAccessKey")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    localStorage.removeItem("JWTRefreshKey")
      navigate("/login")
      window.location.reload()
}

const handleUpdate = () => {
  sendUpdate();
  setNewUsername("");
  setNewPassword("");
  console.log(localStorage)
  
  //history.go("/auth")
}

    return(
        <ListGroup>
          <ListGroup.Item>UserId: {localStorage.getItem("userId")}</ListGroup.Item>

      <ListGroup.Item>Username: {localStorage.getItem("username")} 
      <Alert show={show} variant="danger">
        <Alert.Heading>Are you sure you want to close the account?</Alert.Heading>
        <p>
        Your account will be closed permanently. You can then re-register with the same username but with a different ID.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
        <Button variant="outline-danger" onClick={DeleteUser}>Yes Close My Account</Button>
          <Button onClick={() => setShow(false)} variant="outline-success">
            No
          </Button>
        </div>
      </Alert>
      


      <Alert show={show2} variant="dark">
        <Alert.Heading>Change username and password</Alert.Heading>
        <p>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>New Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username"
        onChange={ (i) => handleNewUsername(i.target.value)}/>
        <Form.Text className="text-muted" >
        Enter the new username, your username is not the same as the old one.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" 
        onChange={ (i) => handleNewPassword(i.target.value)}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick= {() => handleUpdate()}>
        Update Account
      </Button>
      
    </Form>
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow2(false)} variant="outline-danger">
            Close update screen
          </Button>
        </div>
      </Alert>

      {!show && <Button variant="warning" onClick={() => setShow2(true)}>Update Account</Button>} 
      {!show && <Button variant="outline-danger" onClick={() => setShow(true)}>Close Accound</Button>}
      </ListGroup.Item>

      

      
    
    </ListGroup>
    
        
    )

}

export default User;