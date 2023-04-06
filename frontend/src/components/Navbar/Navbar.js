import React from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';



function Navbarr() {

  const KullaniciId = localStorage.getItem("userId")

  
  const onClick = () => {
    localStorage.removeItem("JWTAccessKey")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    localStorage.removeItem("JWTRefreshKey")
    window.location.reload()
    Navigate.toString(0)
  }
 
  return ( 
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/posts">Posts</Nav.Link>

            
            {localStorage.getItem("userId") == null ? <Nav.Link href="/login"></Nav.Link>:
            <>
            <Nav.Link href="/postcreate">Create Post</Nav.Link>
            <Nav.Link href="/demo">Ari Kovani</Nav.Link>
            <Nav.Link href="/chat">Uzak Konsol</Nav.Link>
            </>}


          </Nav>
          
          <Nav>
            {localStorage.getItem("userId") == null ? <Nav.Link href="/login">Login</Nav.Link>:
            <><Button variant="danger" onClick={onClick}>Logout</Button>
            <Nav.Link href="/users">Profile</Nav.Link>
            </>}
          </Nav>
        </Container>

      </Navbar>
      
    </>
    
  )

}

export default Navbarr;








