import express from "express";
import mysql from "mysql";

import {
    getDivisionProperty,
    getCatagorysProperty,
    getPropertySearch


} from "../controllers/search.js";

const search = express.Router();

// for counting how many property are there of different catagory and division
search.get("/divisions-property-count",getDivisionProperty);
search.get("/catagorysProperty-count", getCatagorysProperty);


// for searching property

search.post("/property-search", getPropertySearch)

export default search;