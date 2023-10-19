import React, { useContext, useEffect, useState } from "react";
import "./formpage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const FormPage = () => {

  const {currentUser} = useContext(AuthContext);

  const Navigate = useNavigate();

  const [Location, setLocation] = useState({
        sector_no : "",
        road_no : "",
        house_no : "",
        div_id  : null,
        dis_id : null,
        area_id : null
  })

  const [property,setProperty] = useState({
     phone : currentUser.phone,
     address : "",
     bedroom : null,
     washroom : null,
     balcony : null,
     property_type : "",
     availability_from : "",
     post_date : "",
     gender : "",
     rent : null,
     details : "",
     //loc_id : null,
     cat_id : null
  

  })

  const [catagorys, setCatagorys] = useState([]);


  //fatch all the catagorys to show inside catagory selection bar

  useEffect(() => {
    const fatchCatagory = async () => {

      try{
        const res = await axios.get("http://localhost:8000/catagorys");

        setCatagorys(res.data);
        

      }catch(err){
        console.log(err)
      }

      
    }

    fatchCatagory();
  },[]);



  // property handles 
  const handleChange = (e) => {
    setProperty((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const handleSelection = (e) => {
    setProperty((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const handleOptionChange = (e) => {
    setProperty((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  //console.log(property)

  const property_location = {
    ...property,
    ...Location
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try{
  //     const LocationResponse = await axios.post("http://localhost:8000/property/location",Location);


  //     // let x = 10000;
  //     // while(x--){
  //     //    console.log("wait..")
  //     // }

  //    // setProperty((prev) => ({...prev, loc_id : LocationResponse.data}))
      
  //   //   let y = 1000;
  //   //   while(y--){
  //   //     console.log("wait..")
  //   //  }

  //    /// const x =  property.loc_id 
  //     // while(LocationResponse.data == null || LocationResponse.data == undefined ){
  //     //     console.log("Loading>>>>>>")
  //     // }

      


  //     if(LocationResponse.status === 201){
  //       const locationId = LocationResponse.data.insertId;
  //       setProperty((prev) => ({...prev, loc_id : locationId}))

  //       const propertyResponse = await axios.post('http://localhost:8000/property/', property)

  //       if(propertyResponse.status == 201){
  //         console.log('Property posted successfully!')
  //       }

  //     }

     

  //     Navigate("/")



  //   }catch(err){
  //     console.log("Error posting property : " + err)
  //   }
  // }


  //location handle func

   const handleChangeLocation = (e) => {
    setLocation((prev) => ({...prev, [e.target.name] : e.target.value }))
   }




  // selection bar of division , distric , area

      


      const divisions = [
        {value: 0, text: 'Division'},
        {value: 1, text: 'Dhaka'},
        {value: 2, text: 'Borishal'},
        {value: 3, text: 'Chitagong'},
        {value: 4 , text: 'Rajshahi'},
        {value:5, text: 'Khulna'},
        {value: 6, text: 'Mymenshing'},
        {value: 7, text: 'Sylet'},
        {value:8, text: 'Rongpur'}
      ];

      const [division, setDivision] = useState({
        div_id : divisions[0].value
      });

      const [SelectedDistric, setSelectedDistric] = useState({
        dis_id : 0
      })

      const [SelectedArea, setSelectedArea] = useState({
        area_id : 0
      })

     // console.log(division.div_id);
      ///console.log(SelectedDistric.dis_id);
      ///console.log(SelectedArea.area_id);

      const[districs,  setDistric] = useState([]);
      const[areas, setArea] = useState([]);

      const handleSelectionDivision = (e) => { 
        setDivision({
          div_id : e.target.value
        });

        setLocation((prev) => ({...prev, [e.target.name] : e.target.value }))


      }

      const  handleSelectionDistric = (e) => {
        setSelectedDistric({
          dis_id : e.target.value
        })

        setLocation((prev) => ({...prev, [e.target.name] : e.target.value }))
      }

      const handleSelectionArea = (e) => {
        setSelectedArea({
          area_id : e.target.value
        })

        setLocation((prev) => ({...prev, [e.target.name] : e.target.value }))
      }

     // console.log(SelectedDistric)



      useEffect(() => {

        const fatchDistrict = async () => {

         const res = await axios.post('http://localhost:8000/district', division)
          //console.log(res)

          setDistric(res.data);

        }

        fatchDistrict();
      },[division])

     // console.log(districs);

     //console.log(division);


     useEffect(() => {
      const fatchArea =  async () => {
        const res = await axios.post('http://localhost:8000/area',SelectedDistric)

       setArea(res.data);

       //console.log(res.data)


      }

      fatchArea();
     }, [SelectedDistric])

     //console.log(areas)

    // console.log(Location);



    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try{
        // Post location data and get locationId

        const LocationResponse = await axios.post("http://localhost:8000/property/location",Location);
  
  
        
        if(LocationResponse.status === 201){
         //const locationId = LocationResponse.data.locationId;
         const loc_id = LocationResponse.data.locationId;
        
        

         // update loc_id to insertId of location

         //setProperty((prev) => ({...prev, loc_id : locationId}))
 
         const propertyResponse = await axios.post('http://localhost:8000/property', {...property,loc_id })
 
         if(propertyResponse.status === 201){
           console.log('Property posted successfully!')

           const property_id = propertyResponse.data.propertyID;

           Navigate(`/propertys/img/${property_id}`)
         }


        }


  
       // Navigate("/")
  
  
      }catch(err){
        console.log("Error posting property : " + err)
      }


      
    }


  


   

    //console.log(property_location);
  
  return (
    <div className="body">
      <section className="container">
        <header>ADD NEW PROPERTY</header>
        <form action="#" className="form">
          <div className="input-box">
            <label>Address</label>
            <input type="text" placeholder="Enter Address" onChange={handleChange} name="address" required />
          </div>

          <div className="input-box">
            <label>Property Type</label>
            <input type="text" placeholder="Enter Property Type" onChange={handleChange}  name="property_type" required />
          </div>

          <div className="column">
            <div className="input-box">
              <label>Avallability From</label>
              <input type="date" placeholder="Enter Avallability data " onChange={handleChange} name="availability_from" required />
            </div>
            <div className="input-box">
              <label>Post-Date</label>
              <input type="date" placeholder="Enter Post date" onChange={handleChange} name="post_date" required />
            </div>
          </div>
          <div className="gender-box">
            <h3>Gender</h3>
            <div className="gender-option">
              <div className="gender">
                <input type="radio" id="check-male" onChange={handleOptionChange} name="gender" value="male" />
                <label htmlFor="check-male">male</label>
              </div>
              <div className="gender">
                <input type="radio" id="check-female" onChange={handleOptionChange} name="gender" value="female" />
                <label htmlFor="check-female">Female</label>
              </div>
              <div className="gender">
                <input type="radio" id="check-other" onChange={handleOptionChange} name="gender"  value="ALL"/>
                <label htmlFor="check-other">ALL</label>
              </div>
            </div>
          </div>
          <div className="input-box address">
            <label>Description</label>
            <input type="text" placeholder="Enter description" onChange={handleChange} name="details" required />
          
            
            <label>Location</label>
            <div className="column">
            
              <div className="select-box">
                <select value={division.div_id}   onChange={handleSelectionDivision} name="div_id">
                  {divisions.map((div) => (
                    
                    <option key={div.value} value={div.value}>{div.text}</option>
                  ))}

                  
                </select>
              </div>

              <div className="select-box">
                <select value={SelectedDistric.dis_id} onChange={handleSelectionDistric} name="dis_id">
                <option value={0} hidden>select distric*</option>
                  {districs.map((dis) => (
                    <option key={dis.dis_id} value={dis.dis_id}>{dis.dis_name}</option>

                  ))}
                  
                </select>
              </div>

              <div className="select-box">
                <select value = {SelectedArea.area_id} onChange={handleSelectionArea} name="area_id">
                  <option hidden>select area*</option>

                  {areas.map((a) => (
                    <option value={a.area_id} key={a.area_id}>{a.area_name}</option>

                  ))}
                
                </select>
              </div>


            </div>

           
            <div className="column">
              <input type="text" placeholder="sector no." onChange={handleChangeLocation} name="sector_no"  />
              <input type="text" placeholder="Road no." onChange={handleChangeLocation} name="road_no"  />
              <input type="text" placeholder="House no." onChange={handleChangeLocation} name="house_no"  />
            </div>

            <label>Basic info.</label>
            <div className="column">
              <input type="number" placeholder="BedRooms" onChange={handleChange} name="bedroom" required />
              <input type="number" placeholder="BathRooms" onChange={handleChange} name="washroom" required />
              <input type="number" placeholder="Balchony" onChange={handleChange} name="balcony" required />
            </div>

            <div className="column">
              <div className="select-box">
                  <select name="cat_id"  onChange={handleSelection}>
                      <option hidden>Catagory</option>

                      {catagorys.map((cat) => (
                        <option key={cat.cat_id} value={cat.cat_id}>{cat.cat_name}</option>

                      ))}

                      {/* <option value={1}>Family</option>
                      <option value={2}>Bechelor</option>
                      <option value={3}>Sublet</option>
                      <option value={4}>Hostel</option>
                      <option value={5}>Shop</option> */}
                  </select>
                </div> 
            </div>


            <div className="input-box">
              <label>Price</label>
              <input type="number" placeholder="Enter Montly rent" onChange={handleChange} name="rent" required />
            </div>

          </div>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </section>
    </div>
  );
};

export default FormPage;
