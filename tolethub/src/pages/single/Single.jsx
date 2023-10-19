import "./single.scss"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import LocationOnIcon from '@mui/icons-material/LocationOn';

import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer"
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const Single = () => {

  const [singleProperty, setSingleProperty] = useState({});
  const [allPropertyImg, setAllPropertyImg] = useState([]);
  const location = useLocation();

  const id = location.pathname.split("/")[2];


  const fatchSingle = async () => {
    try{
     const res =  await axios.get("http://localhost:8000/property/single/" + id)
     setSingleProperty(res.data)

    }catch(err){
      console.log(err);
    }
  }


  useEffect(() => {

    fatchSingle();
   // fatchAllImages();

  }, [id])

  //console.log(singleProperty)

  const fatchAllImages = async () => {
    try{
      const res =  await axios.get("http://localhost:8000/property/img/" + id)
      setAllPropertyImg(res.data)
 
     }catch(err){
       console.log(err);
     }
  }

  useEffect(() => {
    fatchAllImages();
  },[id])



  const photos = [
    
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  console.log(allPropertyImg)



  let i = 0;
 // let j = 0;


  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="singleContainer">
          <div className="singleWrapper">
            <button className="bookNow">Contract Now!</button>
            <div className="singleTitle">{singleProperty.property_type}</div>
            <div className="singleAddress">
              <LocationOnIcon />
              <span>{singleProperty.address}</span>
            </div>

            <span className="singleDistance">
              {singleProperty.div_name} / {singleProperty.dis_name} / {singleProperty.area_name}
            </span>
            <span className="singlePriceHighlight">
             this property has . {singleProperty.bedroom} bedrooms . {singleProperty.washroom} washroom . {singleProperty.balcony} balcony 
            </span>

            {/* image gallery */}

            <div className="singleImages">
                {/* { photos.map(photo => (
                  <div className="singleImgWrapper" key={i++}>
                    <img src={photo.src} alt="" className="singleImg" />
                  </div>
                ))} */}

                {( allPropertyImg.length != 0 ) && allPropertyImg.map(proImg => (
                  <div className="singleImgWrapper" key={proImg.img_id}>
                    <img src={proImg.img_url} alt="" className="singleImg" />
                  </div>
                ))}
            </div>

            <div className="singleDetails">
              <div className="singleDetailsTexts">

                <h1 className="singleTitle">Stay in the heart of {singleProperty.dis_name}</h1>
                <p className="singleDesc">
                 {singleProperty.details} <br/>
                 available from : {singleProperty.availability_from}
                
                </p>

                <p className="singleDesc">
                  sector No : {singleProperty.sector_no} <br />
                  road No : {singleProperty.road_no} <br />
                  house No : {singleProperty.house_no} <br />
                </p>

                <p className="singleDesc">
                 
                  owner Contract Number : {singleProperty.phone}
                </p>

            </div>
            <div className="singleDetailsPrice">
                <h1>Perfect for {singleProperty.cat_name}!</h1>
                <span>
                  {singleProperty.address}
                </span>
                <h2>
                  <b> &#2547; {singleProperty.rent}</b> (per Month)
                </h2>
                <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>

        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Single