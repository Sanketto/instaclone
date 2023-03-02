import React, { useEffect, useState } from "react";
import '../styles/post-view.css'
import share from '../images/share.png'
import more from '../images/more_icon.png'
import heart from '../images/heart.png'
import Header from "./Header";
import axios from "axios";
const user = [{
    name: "Sanket",
  location: "Pune",
  description: "Jungle",
  date: "2023/2/24",
  likes: 201,
  postImage: "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"

},
{
    name: "Ai",
  location: "Tokyo",
  description: "Mt. Fuji Japan",
  date: "2023/2/24",
  likes: 5000,
  postImage: "https://www.japanrailpass.com.au/wp-content/uploads/2014/07/Aerial-view-of-Mount-Fuji-volcano-with-a-snow-cap-in-Japan.jpg"

},
{
    name: "John",
  location: "Mumbai",
  description: "Gateway of India",
  date: "2023/2/24",
  likes: 1115,
  postImage: "https://planetofhotels.com/guide/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/Gateway-to-India_0.jpg"
},
{
    name: "Doe",
  location: "Banglore",
  description: "Maisoor Palace",
  date: "2023/2/24",
  likes: 4000,
  postImage: "https://karnatakatourism.org/wp-content/uploads/2020/06/mysore-palace-1.jpg"
}
]

export default function PostView() {
   const[data, setLike] = useState([])
   useEffect(()=>{
     axios.get('https://instbackend.onrender.com/postview')
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
            axios.put(`https://instbackend.onrender.com/create/${data._id}`,data)
            return [...prevData]
         })
    }
    
    return <>
        <Header />
        {
            user.map(data => {
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
