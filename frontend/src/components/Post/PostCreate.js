import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { PostWithAuth } from '../../services/HttpService';
import React from 'react';
import axios from 'axios';

function PostCreate(props) {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [postId, postNo] = useState(""); //normalde props
    const [isSent, setisSent] = useState(false);
    const jwtToken = localStorage.getItem("JWTAccessKey")

    /*const  savePost = () => {
        fetch("/api/post/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                title: title,
                postId: postId,
                text : text,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log("error"))
    }*/

    const handleSubmit = async (e) => {
      e.preventDefault();


          const response = await axios.post("/api/post/create",
              JSON.stringify({ title, text }),
              {
                  headers: { 'Content-Type': 'application/json',
                  "Authorization": 'Bearer ' + jwtToken },
                  
              }
          );
          console.log(JSON.stringify(response?.data));
          //console.log(JSON.stringify(response));
          const accessToken = response?.data?.accessToken;

          
       
          setTitle('');
          setText('');
          setisSent(true);

  }


    /*const handleSubmit = () => {
        savePost();
        setisSent(true);
        setTitle("");
        setText("");

    }*/

    const handleTitle = (value) => {
        setTitle(value);
        setisSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setisSent(false);
    }

    return(
        <>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Enter a Title"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Title" 
        value = {title} onChange={ (i) => handleTitle(i.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Enter a Text">
        <Form.Control
          as="textarea"
          placeholder="Text"
          style={{ height: '100px' }}
          value = {text}
          onChange={ (i) => handleText(i.target.value)}
        />
      </FloatingLabel>
      <Button as="input" type="submit" value="Submit" onClick={handleSubmit} />
    </>
    )
}
export default PostCreate;