import { useEffect, useState } from "react";
import "./PropertyListPage.scss";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";


import Navbar from '../../components/navbar/Navbar';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';



const PropertyListPage = () => {
   const navigation = useNavigate()
   const [property, setProperty] = useState([]);
//   const [divisions, setDivisions] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [areas, setAreas] = useState([]);

     const [buttons, setButtons] = useState([]);

    //  const [differentRoutes, setDifferentRoutes] = useState({
    //     division : "",
    //     district : "",
    //     area : ""
    //  })

  
    const {division,district,area} = useParams();

    useEffect(() => {
       
        const fatchAllButtons = async () => {

            try{
                let url = `http://localhost:8000/district/${division}`

                if(district && !area){      
                   url = `http://localhost:8000/area/${district}`   
                }

                const response = await axios.get(url);

                setButtons(response.data)


            }catch(err){
                console.log(err)
            }
        }

        fatchAllButtons();
    },[division,district])




    

   // console.log(buttons);

  
   const location = useLocation();
  
//   const x = location.pathname.split('/')[2];
  

//   useEffect(() => {
//     setDivisions(x);
//   },[x]);
 

  

  
//const {division,district,area} = useParams();
  useEffect(() => {

    const fetchAllProperty = async () => {
      try {

        // console.log("division Is :" , division);
        // console.log("district Is :" , district);
        // console.log("area Is :" , area);

       
        
        const res = await axios.post("http://localhost:8000/propery-list",{division, district, area});
        setProperty(res.data);
       // console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProperty();
  }, [division,district,area]);


  const handleButtonClick = (e) => {
    let x = e.target.value;
    let size = location.pathname.split('/').length;

    if(size <= 4){
        navigation(`${location.pathname}/${x}`)
    }
    else{

        let nav = location.pathname.split('/');
        nav[4] = x;
        navigation(nav.join('/'))
        
    } 
  }

  //console.log(`${division}/${district}/${area}`)

  
  return (

    <div className="container">

        <Navbar />

        <div className="first">
            <div className="btnGroup">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">

                    {buttons.map((button) => (
                        <Button key={button.id} value={button.name} onClick={handleButtonClick}>{button.name}</Button>

                    ))}
                    {/* <Button>Borishal</Button>
                    <Button>Khulna</Button>
                    <Button>Dhaka</Button>
                    <Button>Borishal</Button>
                    <Button>Khulna</Button> */}
                </ButtonGroup>
            </div>

        
        </div>

        <div className="second">

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
                    <img src="https://cf.bstatic.com/xdata/images/hotel/square600/87428762.webp?k=de5db8fe94cbfe08d3bf16d3c86def035fd73b43ee497cffe27b03363764e0e2&o=" alt="" className="fpImg" />
                    <span className="fpName">Habib Mention</span>
                    <span className="fpArea">Uttora</span>
                    <span className="fpPrice">12K/month</span>

                    <div className="fpRating">
                        <button>8.9</button>
                        <span>Excellent</span>
                    </div>
                </div> */}

               
               



            </div>

        </div>

        

    </div>
  );
};

export default PropertyListPage;
