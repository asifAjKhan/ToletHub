import { useEffect, useState } from "react"
import "./featured.scss"
import axios from 'axios';

const Featured = () => {

    const [divisions, setDivisions] = useState([]);

    useEffect(() => {
        const fatchAllDivision = async () => {

            try{
                const res = await axios.get("http://localhost:8000/divisions-property-count");
                setDivisions(res.data);
            }catch(err){
                console.log(err)
            }
            
        }

        fatchAllDivision();
    })

    const photos = [
    
        {
          src: "https://images.unsplash.com/photo-1537631451511-4afc8117da0d?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp",
        },
        {
          src: "https://images.unsplash.com/photo-1564034503-e7c9edcb420c?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2148&amp;q=80 2148w",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Jaflong_Sylhet.jpg",
        },
      ];
    


      let i = 0


  return (
    <div className="featured">

        {divisions.slice(1,4).map((div) => (

            <div className="featuredItem" key={div.div_name}>
                <img src={photos[i].src} alt="city Img"  className="featuredImg" />
                {i++}
                <div className="featuredTitles">
                    <h1>{div.div_name}</h1>
                    <h2>{div.num} properties</h2>
                </div>
            </div>

        ))}

       {/* <div className="featuredItem">
            <img src="https://images.pexels.com/photos/3496753/pexels-photo-3496753.jpeg" alt="city Img" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Borishal</h1>
                <h2>340 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://images.pexels.com/photos/3496753/pexels-photo-3496753.jpeg" alt="city Img" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Borishal</h1>
                <h2>340 properties</h2>
            </div>
        </div>
         */}

        {/* <div className="featuredItem">
            <img src="https://images.pexels.com/photos/3496753/pexels-photo-3496753.jpeg" alt="city Img" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Borishal</h1>
                <h2>340 properties</h2>
            </div>
        </div>

        <div className="featuredItem">
            <img src="https://images.pexels.com/photos/3496753/pexels-photo-3496753.jpeg" alt="city Img"  className="featuredImg" />
            <div className="featuredTitles">
                <h1>Chitagong</h1>
                <h2>502 properties</h2>
            </div>
        </div>

        <div className="featuredItem">
            <img src="https://images.pexels.com/photos/3496753/pexels-photo-3496753.jpeg" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Cox's Bazar</h1>
                <h2>532 properties</h2>
            </div>
        </div> */}
        
    </div>
  )
}

export default Featured