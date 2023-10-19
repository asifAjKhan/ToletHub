import express from "express";
import mysql from "mysql";

import {
  deletRegCallback,
  postRegCallback,
  updateRegCallback,
  getRegCallback,
  deletPropertyCallback,
  postPropertyCallback,
  updatePropertyCallback,
  getPropertyCallback,
  getLocCallback,
  getCatCallback,
  getDivison,
  getDistric,
  getArea,
  gerProperty_list,
  getDis,
  getAr
  //postLocation
  


} from "../controllers/constroller.js";

const route = express.Router();



//register table routes
route.get("/register", getRegCallback);
route.post("/register", postRegCallback);
route.delete("/register/:id", deletRegCallback);
route.put("/register/:id", updateRegCallback);


//property table routes

route.get("/property", getPropertyCallback);
//route.post("/property", postPropertyCallback);
//route.delete("/property/:id", deletPropertyCallback);
//route.put("/property/:id", updatePropertyCallback);


//location  for from selecton input

//route.get("/location", getLocCallback);

//catagory for from selecton input

route.get("/catagorys", getCatCallback);


// division , distric, area

route.get("/division", getDivison);
route.post("/district", getDistric);
route.post("/area", getArea);



//Fatch district according to the division name
// and area according to district name

route.get("/district/:division", getDis);
route.get("/area/:district", getAr);
//route.post("/location",postLocation)



//create routes for dynamic rendered property-list 

route.post("/propery-list",gerProperty_list)



export default route;
