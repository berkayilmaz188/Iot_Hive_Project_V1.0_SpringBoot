import axios from "axios";


export const PostWithAuth = (url, body) => {

    var request = fetch("/api"+url,  {
        method: "POST", 
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body : JSON.stringify(body),
      })

    return request
}


export const DeleteWithPost = (url) => {

  var request = fetch("/api"+url,  {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),
      },
    })

  return request
}