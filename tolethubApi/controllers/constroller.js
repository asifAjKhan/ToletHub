import db from "../database.js";

// register table controllers

export const getRegCallback = (req, res) => {
  const q = "SELECT * FROM register";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
};

export const postRegCallback = (req, res) => {
  const q =
    "INSERT INTO register (`username`, `password`, `phone`, `email`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.password,
    req.body.phone,
    req.body.email,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Register has been successfully created");
  });
};

export const deletRegCallback = (req, res) => {
  const bookId = req.params.id;
  console.log(bookId);
  const q = "DELETE FROM register WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("register has been deleted successfully ");
  });
};

export const updateRegCallback = (req, res) => {
  const booId = req.params.id;
  const q =
    "UPDATE register SET `username`, `password`, `phone`, `email` WHERE id = ?";

  const values = [
    req.body.username,
    req.body.password,
    req.body.phone,
    req.body.email,
  ];

  db.query(q, [...values, booId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Register has been updated");
  });
};

// property controllers

export const getPropertyCallback = (req, res) => {
  const q = "SELECT * FROM property";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
};

export const postPropertyCallback = (req, res) => {

  const {div_id, dis_id, area_id,sector_no, road_no, house_no} = req.body;
  
  const loc_values = [
    sector_no,
    road_no,
    house_no,
    div_id,
    dis_id,
    area_id
  ];

  const ql = "INSERT INTO location (`sector_no`, `road_no`, `house_no`, `div_id`, `dis_id` , `area_id`) VALUES ( ? )";


  db.query(ql,[loc_values], (err, data) => {
    if(err){
      console.log(err)
      res.status(500).json({message : "error creating location"})
    }else{
      console.log("after this")
      console.log(data);

        const location_id = data.insertId;

      // insert property with locaton


          const q =
          "INSERT INTO property (`phone`, `property_id`, `address`, `bedroom`,`washroom`, `balcony`, `property_type`, `availability_from`, `post_date`, `gender`, `rent`, `details`,`catagory_id`, `loc_id`,`office_room`) VALUES (?)";
          const values = [
          req.body.phone,
          req.body.property_id,
          req.body.address,
          req.body.bedroom,
          req.body.washroom,
          req.body.balcony,
          req.body.property_type,
          req.body.availability_from,
          req.body.post_date,
          req.body.gender,
          req.body.rent,
          req.body.details,
          req.body.catagory_id,
          location_id,
          req.body.office_room
        ];

        db.query(q, [values], (err, data) => {
        if(err) {
          console.log(err)
          res.status(500).json({message : 'error creating property'})
        }else{
          res.status(201).json({message : 'property posted successfully'})
        }
        });


        
      }
    })



  
};

export const deletPropertyCallback = (req, res) => {
  const bookId = req.params.id;
  console.log(bookId);
  const q = "DELETE FROM property WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Property has been deleted successfully ");
  });
};

export const updatePropertyCallback = (req, res) => {
  const booId = req.params.id;
  const q =
    "UPDATE property SET `phone`, `property_id`, `address`, `bedroom`,`washroom`, `balcony`, `property_type`, `availability_from`, `post_date`, `gender`, `rent`, `details`,`catagory_id`, `loc_id`,`office_room` WHERE id = ?";

  const values = [
    req.body.phone,
    req.body.property_id,
    req.body.address,
    req.body.bedroom,
    req.body.washroom,
    req.body.balcony,
    req.body.property_type,
    req.body.availability_from,
    req.body.post_date,
    req.body.gender,
    req.body.rent,
    req.body.details,
    req.body.catagory_id,
    req.body.loc_id,
    req.body.office_room
  ];

  db.query(q, [...values, booId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Property has been updated");
  });
};


//location and catagory routes

export const getLocCallback = (req,res) => {
  const q = "SELECT * FROM location";

  db.query(q,(err, data) => {
    if(err) return res.json(err);
    else return res.json(data)
  })
}

export const getCatCallback = (req,res) => {
  const q = "SELECT * FROM catagory";

  db.query(q,(err, data) => {
    if(err) return res.json(err);
    else return res.json(data)
  })
}

// get division , distric , area


export const getDivison = (req, res) => {
  const q = "SELECT * FROM division ORDER BY div_name";

  db.query(q, (err, data) => {
    if(err) return res.json(err);
    else return res.json(data)
  })
}

export const getDistric = (req, res) => {
  const q = "SELECT * FROM distric WHERE div_id = ?";

  db.query(q,[req.body.div_id], (err, data) => {
    if(err) return res.json(err);
    else return res.json(data)
  })
}


export const getDis = (req, res) => {
  let {division} = req.params
  const q = "SELECT dis_id AS id , dis_name AS name FROM distric AS dis JOIN division AS divi ON divi.div_id = dis.div_id WHERE div_name = ? ";

  db.query(q,[division] ,(err, data) => {
    if(err) return res.json(err);
    else return res.json(data)
  })
}

export const getArea = (req, res) => {
  const q = "SELECT * FROM area WHERE dis_id = ?";

  db.query(q,[req.body.dis_id], (err, data) => {
    if(err) return res.json(err);
    else return res.json(data)
  })
}

export const getAr = (req, res) => {

  const {district} = req.params;
  
  const q = "SELECT area_id as id , area_name as name FROM area AS a JOIN distric AS dis ON a.dis_id = dis.dis_id WHERE dis_name = ?";

  db.query(q,[district] ,(err, data) => {
    if(err) return res.json(err);
    else return res.json(data)
  })
}


// export const postLocation = (req, res) => {

// }


// property_list callback

export const gerProperty_list = (req, res) => {

 
  const {division, district, area} = req.body;

 // console.log(`${division}/${district}/${area}`)

  let query = `SELECT *  FROM property AS p JOIN location AS l ON p.loc_id = l.loc_id JOIN division AS divi  ON l.div_id = divi.div_id   JOIN distric AS dis    ON l.dis_id = dis.dis_id  JOIN area AS ar  ON l.area_id = ar.area_id`   ;

  if (division) {
    query += ` WHERE divi.div_name = "${division}"`;

    if (district) {
      query += ` AND dis.dis_name = "${district}"`;

      if (area) {
        query += ` AND ar.area_name = "${area}"`;
      }
    }
  }

  db.query(query,(error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json(error);
    } else {
      res.json(result);
    }
  });

}



