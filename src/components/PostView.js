import React, { useEffect, useState } from "react";
import '../styles/post-view.css'
import share from '../images/share.png'
import more from '../images/more_icon.png'
import heart from '../images/heart.png'
import Header from "./Header";
import axios from "axios";

export default function PostView() {
   const[data, setLike] = useState([])
   useEffect(()=>{
     axios.get('http://localhost:3000/postview')
     .then(res=>{
        setLike(res.data)
     })
   },[])
    const getLikes = (data) => {
        data.likes= data.likes+1;
         setLike(prevData=>{
            for(let i=0; i<prevData.length; i++){
                if(prevData[i]._id === data._id)
                {
                    prevData.splice(i,1,data)
                    break;
                }
            } 
            axios.put(`http://localhost:3000/create/${data._id}`,data)
            return [...prevData]
         })
    }
    
    return <>
        <Header />
        {
            data.map(data => {
                return <>
                    <div className="post-container">
                        <header>
                            <div>
                                <p>{data.name}</p>
                                <p>{data.location}</p>
                            </div>
                            <img src={more} />
                        </header>
                        <section id="post-img">
                            <img src={data.postImage && heart} alt="post-img" />
                        </section>

                        <footer>
                            <div>
                                <img onClick={()=>getLikes(data)} src={heart} />
                                <img src={share} />
                                <p>{data.date}</p>
                            </div>
                            <p>{data.likes} likes</p>
                            <p>{data.description}</p>
                        </footer>
                    </div>
                </>
            })
        }
    </>
}
