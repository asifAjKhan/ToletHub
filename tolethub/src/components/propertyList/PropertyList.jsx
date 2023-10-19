import { useEffect, useState } from "react"
import "./propertyList.scss"
import axios from "axios"

const PropertyList = () => {

    const [catagories, setCatagories] = useState([]);

    useEffect(() => {
        const fatchAllCatagoies =  async () => {

            try{
                const res = await axios.get("http://localhost:8000/catagorysProperty-count");     
                setCatagories(res.data);
                

            }catch(err){
                console.log(err)
            }


        }

        fatchAllCatagoies();
    })

    const images = [
        "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
        "https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450074.jpeg?k=7039b03a94f3b99262c4b3054b0edcbbb91e9dade85b6efc880d45288a06c126&o=",
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/52979454.jpeg?k=6ac6d0afd28e4ce00a8f817cc3045039e064469a3f9a88059706c0b45adf2e7d&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450074.jpeg?k=7039b03a94f3b99262c4b3054b0edcbbb91e9dade85b6efc880d45288a06c126&o=" 

    ]

    let i = 0;
  return (
    <div className="pList">


        {catagories.slice(0,5).map((cat) => (

            <div className="pListItem">
                
               
                <img src={images[i++]} alt="" className="pListImg" />

                <div className="pListTitles">
                    <h1>{cat.cat_name}</h1>
                    <h2>{cat.catCount} {cat.cat_name}</h2>
                </div>
            </div>


        ))}
        

        {/* <div className="pListItem">
            <img src="https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=" alt="" className="pListImg" />
            <div className="pListTitles">
                <h1>Office</h1>
                <h2>233 Office</h2>
            </div>
        </div>


        <div className="pListItem">
            <img src="https://q-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=" alt="" className="pListImg" />
            <div className="pListTitles">
                <h1>Resorts</h1>
                <h2>456 Resorts</h2>
            </div>
        </div>

        <div className="pListItem">
            <img src="https://q-xx.bstatic.com/xdata/images/hotel/263x210/52979454.jpeg?k=6ac6d0afd28e4ce00a8f817cc3045039e064469a3f9a88059706c0b45adf2e7d&o=" alt="" className="pListImg" />
            <div className="pListTitles">
                <h1>Bacholor</h1>
                <h2>456 Resorts</h2>
            </div>
        </div>

        <div className="pListItem">
            <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450074.jpeg?k=7039b03a94f3b99262c4b3054b0edcbbb91e9dade85b6efc880d45288a06c126&o=" alt="" className="pListImg" />
            <div className="pListTitles">
                <h1>Shops</h1>
                <h2>456 Resorts</h2>
            </div>
        </div> */}
    </div>
  )
}

export default PropertyList