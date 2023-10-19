import "./list.scss"

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-date-range"
import SearchItem from "../../components/searchItem/SearchItem";
import axios from "axios";
import qs from 'qs'





const List = () => {

  const location = useLocation()
  const [openDate, setOpenDate] = useState(false)

  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options)

  const [MaxPrice,setMaxPrice] = useState();
  const [MinPrice, setMinPrice] = useState();

  let startDate = format(date[0].startDate, "yyyy-MM-dd");
  let endDate = format(date[0].endDate, "yyyy-MM-dd");

  let Min = Number(MinPrice);
  let Max = Number(MaxPrice);



 //let [division,district,area] = destination.split(',');
//  let division = destination.split(',')[0];
//  let district = destination.split(',')[1];
//  let area = destination.split(',')[2];
//  //let {rooms, washRooms, balcony} = options;
//  let bedroom = options.rooms;
//  let washroom = options.washRooms;
//  let balcony = options.balcony;
//  let startDate = format(date[0].startDate, "MM/dd/yyyy");
//  let endDate = format(date[0].endDate, "MM/dd/yyyy");
 
 

//  const history = useHistory();
//  const [criteria, setCriteria] = useState({
//       bedroom : rooms,
//       washroom : washRooms,
//       balcony : balcony,
//       division : division,
//       district : district,
//       area : area ,
//       availability_from : endDate,
//       Min : Min,
//       Max : Max

//  })

 



  // const [propertyList, setPropertyList] = useState({
  //     bedroom : rooms,
  //     washroom : washRooms,
  //     balcony,
  //     division,
  //     district,
  //     area ,
  //     availability_from : endDate,
  //     Min,
  //     Max
  // })

  //const  {bedroom, washroom, balcony, Min, Max, division, district, area, availability_from} = req.body;}

//   const [property, setProperty] = useState({
//     property_id : null,
//     phone : "",
//     bedroom : null,
//     washroom : null,
//     balcony : null,
//     property_type : "",
//     gender : "",
//     availability_from : "",
//     post_date : "",
//     div_name: "",
//     dis_name: "",
//     area_name: "",
//     rent : null,
//     details : ""
// })

 const [propertySearch, setPropertySearch] = useState([]);


//   console.log(division)
//   console.log(district)
//   console.log(area)
//   console.log(bedroom)
//   console.log(washroom)
//   console.log(balcony)
//   console.log(Min)
//   console.log(Max)

  // useEffect(() => {
  //    const fatchAllList = async () => {
  //       try{
  //         const res = await axios.get("http://localhost:8000/property-search", {bedroom, washroom, balcony, Min, Max, division, district, area, endDate});
  //         console.log("property ");
  //         console.log(res.data)
  //         //setProperty(res.data);
          
  //       }catch(err){
  //         console.log(err)
  //       }
  //    }

  //    fatchAllList();
  // },[Min, Max])







  const handleMaxPriceClick = (e) => {
      setMaxPrice(e.target.value);
  }

  const handleMinPriceClick = (e) => {
    setMinPrice(e.target.value);
}









   //console.log(property);
  // console.log(location)
  //  console.log("desti : " + destination)
  //  console.log( destination.split(','))
  //  console.log(division)

  //  console.log(options)

 // console.log(format(date[0].startDate, "yyyy-MM-dd"))
 // console.log(format(date[0].endDate, "MM-dd-yyyy"))

  //2023-08-21

  // console.log(MinPrice);
  // console.log(MaxPrice)

  // console.log(division)
  // console.log(district)
  // console.log(area)
  // console.log(rooms)
  // console.log(washRooms)
  // console.log(balcony)
  // console.log(Min)
  // console.log(Max)

  const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });

  //console.log(queryParams.selectedArea )

  console.log(propertySearch);


  useEffect(() => {
    const fatchAllList = async () => {
            try{
              const res = await axios.post("http://localhost:8000/property-search",{ params: queryParams, data: {startDate,endDate,Min,Max} });
             // console.log("property ");
              //console.log(res.data)
              setPropertySearch(res.data);
              
            }catch(err){
              console.log(err)
            }
         }
    
         fatchAllList();
  },[location.search, Min, Max])





  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label className="lsItemLabel">Location</label>
              <input className="lsItemInput"   type="text" placeholder= {`${destination}`} />
            </div>

            <div className="lsItem">
              <label className="lsItemLabel">Check-in Date</label>
              <span className="lsItemSpan" onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (<DateRange 
                onChange = {(item) => setDate([item.selection])} 
                minDate = {new Date()}
                ranges ={date}
              />)}
            </div>
              
              <div className="lsItem">
               
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min Price   <small>  per Month</small>
                    </span>

                    <input type="number" className="lsOptionInput"  onChange={handleMinPriceClick} />
                  </div>
                  
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max Price <small> per Month</small>
                    </span>

                    <input type="number" className="lsOptionInput"  onChange={handleMaxPriceClick} />
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      rooms 
                    </span>

                    <input type="number" min={1} placeholder={options.rooms} className="lsOptionInput" />
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      washRooms 
                    </span>

                    <input type="number" min={0} placeholder={options.washRooms} className="lsOptionInput" />
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Balcony
                    </span>

                    <input type="number" min={0} placeholder={options.balcony} className="lsOptionInput" />
                  </div>

                </div>
                

              </div>

              <button>Search</button>

          </div>

          <div className="listResult">

            {propertySearch.map((pro) => (
              <SearchItem key={pro.property_id} item={pro} />
              

            ))}
            {/* <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;