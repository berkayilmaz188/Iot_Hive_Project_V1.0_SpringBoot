import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Post from "../Post/Post";
import PropTypes from 'prop-types';

function Home() {
    const [error, setError] = useState(null);
    const [IsLoaded, setIsloaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const jwtToken = localStorage.getItem("JWTAccessKey")

    Home.propTypes = {
        title: PropTypes.string
      };
      Home.propTypes = {
        text: PropTypes.string
      };
      Home.propTypes = {
        postId: PropTypes.string
      };
    
    const refreshPosts = () => {
        fetch("/api/post", {
            method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        },
        })
        .then(res => res.json())
        .then(
            (res) => {
                setIsloaded(true);
                setPostList(res);
                localStorage.setItem("post",res.postId)
            },
            (error) => {
                setIsloaded(true);
                setError(error);
            }
        )
    }



    useEffect(() => {
        refreshPosts()

    }, [])

    if(error) {
        return <div>
             Please Login and try again..</div>
    } else if(!IsLoaded) {
        return <div> Data Loading ..</div>
    } else {
        return(

    <Container>
      <Row>
        <Col> {postList.map(post => (
            
               <Post key={post.title} title={post.title} text={post.text} postId={post.postId}></Post>
            
        ))} </Col>
      </Row>
    </Container>
        )


        }
    }
export default Home;

