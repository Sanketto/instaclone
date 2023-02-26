import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/new-post.css'


export default function NewPost(){
    const [data, setData] = useState({
      name: "",
      description: "",
      postImage: "",
      location: "",
      likes: 0,
      date: ""
    })
    const navigate = useNavigate()

     const uploadImg =(e)=> {
      setData(prevData=>({
        ...prevData,
        postImage: e.target.files[0]
      }))
    }
  
    return (
      <div className="post-form">
          <form  onSubmit={(e)=>{
            e.preventDefault();
            let time = new Date();
            data.date= `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()}`;
           setData(prevData=>({
              ...prevData,
              date: `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()}`
           }))
           
          
            axios.post('http://localhost:3000/create', data)
            .then(res=>{
              console.log(res);
            })
            .catch(err=>{
              console.log(err);
            })
            navigate('/postview')
          }}>
            <div>
            <input id="file" type="file" 
              onChange={uploadImg}  
              accept="image/*"
            />
            </div>
            <div id="author">
              <input type="text" 
                onChange={(e)=>{
                  setData(prevData=>({
                    ...prevData,
                    name: e.target.value
                  }))
                }}  
                value={data.name}
                placeholder="Author"/>
              <input type="text"
              onChange={(e)=>{
                setData(prevData=>({
                  ...prevData,
                  location: e.target.value
                }))
              }}  
              value={data.location}
              placeholder="Location"/>
            </div>
            <div>
              <input type="text"
              onChange={(e)=>{
                setData(prevData=>({
                  ...prevData,
                  description: e.target.value
                }))
              }}  
              value={data.description}
              placeholder="description"/>
              </div>
              <div id="post-btn">
                  <button type="submit">Post</button>
              </div>
          </form>
      </div>
    );
}