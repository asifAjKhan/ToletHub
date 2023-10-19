import { useEffect, useState } from "react";
import "./featuredProperties.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import moment from 'moment';

const FeaturedProperties = () => {
  const [property, setProperty] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchAllProperty = async () => {
      try {
        const res = await axios.get("http://localhost:8000/property");
        setProperty(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProperty();
  }, []);

  
  return (
    <div className="fp">
      {property.map((pro) => (
        
         (<div className="fpItem" key={pro.property_id}>

          <Link to={`/single/${pro.property_id}`}>

            <img
              src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o="
              alt=""
              className="fpImg"
              // onClick={handleClick(pro.property_id)}
            />
          </Link>
          
          <span className="fpName">{pro.property_type}</span>
          <span className="fpArea">{pro.availability_from}</span>
          <span className="fpPrice"> Tk. {pro.rent}</span>

          <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
          </div>

          <div className="fpRating">
            <span>Posted {moment(pro.post_date).fromNow()}</span>
          </div>
        </div>)
    
      



      ))}

      {/* will be comments */}

       {/* <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/87428762.webp?k=de5db8fe94cbfe08d3bf16d3c86def035fd73b43ee497cffe27b03363764e0e2&o=" alt="" className="fpImg" />
            <span className="fpName">Habib Mention</span>
            <span className="fpArea">Uttora</span>
            <span className="fpPrice">12K/month</span>

            <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div>

        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=c4092495705eab3fad626e8e1a43b1daf7c623e4ea41daf26a201b4417a71709&o=" alt="" className="fpImg" />
            <span className="fpName">Khan fundation</span>
            <span className="fpArea">Notun bazar</span>
            <span className="fpPrice">12K/month</span>

            <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div>

        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=c4092495705eab3fad626e8e1a43b1daf7c623e4ea41daf26a201b4417a71709&o=" alt="" className="fpImg" />
            <span className="fpName">Khan fundation</span>
            <span className="fpArea">Notun bazar</span>
            <span className="fpPrice">12K/month</span>

            <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div> 

        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=c4092495705eab3fad626e8e1a43b1daf7c623e4ea41daf26a201b4417a71709&o=" alt="" className="fpImg" />
            <span className="fpName">Khan fundation</span>
            <span className="fpArea">Notun bazar</span>
            <span className="fpPrice">12K/month</span>

            <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div> 


        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=c4092495705eab3fad626e8e1a43b1daf7c623e4ea41daf26a201b4417a71709&o=" alt="" className="fpImg" />
            <span className="fpName">Khan fundation</span>
            <span className="fpArea">Notun bazar</span>
            <span className="fpPrice">12K/month</span>

            <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div> 


        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=c4092495705eab3fad626e8e1a43b1daf7c623e4ea41daf26a201b4417a71709&o=" alt="" className="fpImg" />
            <span className="fpName">Khan fundation</span>
            <span className="fpArea">Notun bazar</span>
            <span className="fpPrice">12K/month</span>

            <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div> 

        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=c4092495705eab3fad626e8e1a43b1daf7c623e4ea41daf26a201b4417a71709&o=" alt="" className="fpImg" />
            <span className="fpName">Khan fundation</span>
            <span className="fpArea">Notun bazar</span>
            <span className="fpPrice">12K/month</span>

            <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div> 
 */}




    </div>
  );
};

export default FeaturedProperties;
