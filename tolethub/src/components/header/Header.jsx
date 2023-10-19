import { useEffect, useState } from 'react';
import './header.scss';


// MUI icons
import HomeIcon from '@mui/icons-material/Home';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BoyIcon from '@mui/icons-material/Boy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

//import { useHistory } from 'react-router-dom';

//import AddIcon from '@mui/icons-material/Add';


//react-date-range

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';




const Header = ({type}) => {

    const [destination, setDestination] = useState("")
    
    const[divisions, setDivisions] = useState([]);

    //for toggling date selector
    const [openDate , setOpenDate] = useState(false)

    //for date range
    const [date, setDate] = useState([
        {
            startDate : new Date(),
            endDate : new Date(),
            key : 'selection'
        }
    ]);

    //Open Options

    const [openOptions , setOpenOptions] = useState(false)


    const [options, setOptions] = useState({
        rooms : 1,
        washRooms : 0,
        balcony : 1
        
    })



    const navigate = useNavigate()

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name] : operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        })
    }

   


   const selectedArr = destination.split(',');
   //alert(destination)
    let selectedDivi = selectedArr[0];
    let selectedDis = selectedArr[1];
    let selectedArea = selectedArr[2];
    const {rooms, washRooms, balcony} = options;
    const endDate = format(date[0].endDate, "MM/dd/yyyy");
 


  // const history = useHistory();
    // const [criteria, setCriteria] = useState({
    //   destination,
    //   bedroom : rooms,
    //   washroom : washRooms,
    //   balcony,
    // });



    const handleSearch = (e) => {

        e.preventDefault();
       // const queryString = new URLSearchParams(criteria).toString();
        
      // navigate(`/propertys?${queryString}`, {state : {destination, date, options}});

       // working on here
       // fist take all the criteria and add it the the query params

        
       
       //const queryString = new URLSearchParams(criteria).toString();
       //history.push(`/property-list?${queryString}`)

    //    const [criteria, setCriteria] = useState({
    //     destination,
    //     bedroom : rooms,
    //     washroom : washRooms,
    //     balcony,
    //   });

       const queryString = qs.stringify({selectedDivi,selectedDis, selectedArea ,rooms, washRooms, balcony}); // Create the query string
        navigate(`/propertys?${queryString}`,{state : {destination, date, options}})




    };

    const handleSingInButton = () => {
        navigate("/register")
    }

    const handleHome = () => {
        navigate("/")
    }

    // const handlePropertyListClick = (e) => {

        
    //     navigate("/")
    // }


    // Propery-list feltering 

    useEffect(() => {
        const fatchDestrictFromDB = async () => {
            const destricValues = await axios.get("http://localhost:8000/division");

            setDivisions(destricValues.data);

        }

        fatchDestrictFromDB();
    },[]);






  return (
    <div className='header'>
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active" onClick={handleHome}>
                    <HomeIcon />
                    <span >Home</span>
                </div>

                <div className="headerListItem">
                    <MapOutlinedIcon />
                    <span>Property Map</span>
                </div>

                {/* <div className="headerListItem">
                    <ListIcon />
                    <span onClick={handlePropertyListClick}>Property List</span>
                    <KeyboardArrowDownIcon />


                </div> */}

           

                    <div className="headerListItem dropdown " >
                        <ListIcon />
                        <span > Property List </span>
                        <div class="dropdown-content">


                            <Link className='a' to="/property-list"> All property </Link>

                            {divisions.map((div) => (

                                <Link className='a' to={`/property-list/${div.div_name}`}> {div.div_name} division </Link>

                            ))}
                            {/* <Link className='a' to="/property-list/1"> Barishal division </Link> */}
                            {/* <Link className='a' to="/property-list/2"> Chittagong division </Link>
                            <Link className='a' to="/property-list/3"> Dhaka division </Link>
                            <Link className='a' to="/property-list/4"> Khulna division </Link>
                            <Link className='a' to="/property-list/5"> Mymensingh division </Link>
                            <Link className='a' to="/property-list/6"> Rajshahi division </Link>
                            <Link className='a' to="/property-list/7"> Rangpur division </Link>
                            <Link className='a' to="/property-list/8"> Sylhet division </Link> */}
                        </div>

                        <KeyboardArrowDownIcon />
                    </div>

          
                

                <div className="headerListItem">
                    <SettingsIcon />
                    <span>Setting</span>
                </div>

            </div>

            { type !== "list" && <><h1 className="headerTitle">A Awsome place to find home.</h1>
            <p className="headerDesc">
            The app allows users to search for properties using various filters such as location, price range, property type, and more. Advanced search features could include sorting by relevance, price, and popularity.
            </p>

            <button className="headerBtn" onClick={handleSingInButton}>Sign in / Register </button>

            <div className="headerSearch">
                <div className="headerSearchItem">
                    <SearchIcon className='headerIcon' />
                    <input 
                        type='text' 
                        placeholder='Division, District, Area'
                        className='headerSearchInput'
                        onChange={e => setDestination(e.target.value) }
                    />
                </div>


                <div className="headerSearchItem">
                    <CalendarMonthIcon  className='headerIcon' />
                    <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                   {openDate && (<DateRange
                        editableDateInputs ={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection ={false}
                        ranges ={date}
                        className='date'
                        minDate={new Date()}
                    />)}
                        
                    
                </div>


                <div className="headerSearchItem">
                    <BoyIcon  className='headerIcon' />
                    <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.rooms} rooms . ${options.washRooms}  washRooms . ${options.balcony} balcony`}</span>
                    
                    { openOptions && <div className="options">
                        <div className="optionItem">
                            <span className="optionText">rooms</span>
                            <div className="potionCounter">
                                <button 
                                 disabled ={options.rooms <= 1}
                                className="optionCounterButton"
                                onClick={() => handleOption("rooms", "d")}
                                >-</button>
                                <span className="optionCounterNumber">{options.rooms}</span>
                                <button className="optionCounterButton" onClick={() => handleOption("rooms", "i")}>+</button>
                            </div>
                            
                        </div>

                        <div className="optionItem">
                            <span className="optionText">washRooms</span>
                            <div className="potionCounter">
                                <button
                                  disabled ={options.washRooms <= 1}
                                 className="optionCounterButton" 
                                 onClick={() => handleOption("washRooms", "d")}
                                 >-</button>
                                <span className="optionCounterNumber">{options.washRooms}</span>
                                <button className="optionCounterButton" onClick={() => handleOption("washRooms", "i")}>+</button>
                            </div>
                        </div>

                        <div className="optionItem">
                            <span className="optionText">Balcony</span>
                            <div className="potionCounter">
                                <button
                                    disabled ={options.balcony <= 1}
                                    className="optionCounterButton" 
                                    onClick={() => handleOption("balcony", "d")}
                                >-
                                </button>
                                <span className="optionCounterNumber">{options.balcony}</span>
                                <button className="optionCounterButton" onClick={() => handleOption("balcony", "i")}>+</button>
                            </div>
                        </div>
                    </div>
                    }


                </div>

                <div className="headerSearchItem">
                  <button className="headerBtn" onClick={handleSearch}>Search</button>
                </div>


            </div>
            </>}
        </div>
    </div>
  )
}

export default Header