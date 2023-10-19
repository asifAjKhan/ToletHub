import "./searchItem.scss"
import {Link,useNavigate } from "react-router-dom";

const SearchItem = ({item}) => {

   // let property =  props;
   // console.log("this is  pro")
   // console.log( item);
   // console.log(props.item);

   const navigate = useNavigate()

   const handleClick = (e) => {
    navigate(`/single/${item.property_id}`)
   }

   
  return (

    

      <div className="searchItem">

        
      <Link  to={`/single/${item.property_id}`}>

      <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
          alt=""
          className="siImg"
          //onClick={handlePropertyClick}
        />
      </Link>
        

        <div className="siDesc">
            <h1 className="siTitle">{}</h1>
            <span className="siDistance">{item.area_name}</span>
            <span className="siTaxiOp">available from {item.availability_from}</span>
            <span className="siSubtitle">
            {item.address}
            </span>
            <span className="siFeatures">
            {item.property_type} • {item.bedroom} bedroom • {item.washroom} Washroom and {item.balcony} Balcony
            </span>
            <span className="siCancelOp"> gender : {item.gender} </span>
            <span className="siCancelOpSubtitle">
            {item.details.split(" ").slice(0, 20).toString().replace(/,/g, " ")}
            </span>
         </div>
          <div className="siDetails">
            <div className="siRating">
                <span>Excellent</span>
                <button>8.9</button>
            </div>
            <div className="siDetailTexts">
                <span className="siPrice">&#2547; {item.rent}</span>
                <span className="siTaxOp"> withOut Elecity and Gas </span>
                <button className="siCheckButton" onClick={handleClick}>See availability</button>
            </div>
        </div>


      </div>

   // ))}
    
  )
}

export default SearchItem