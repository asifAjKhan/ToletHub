import db from "../database.js";


//show single post in single post page

export const singlePost = (req, res) => {

    const Id = req.params.id;
    console.log(Id)

    const q = "SELECT * FROM property as p join location as l on p.loc_id = l.loc_id join division as divi on l.div_id = divi.div_id join distric as dis on l.dis_id = dis.dis_id join area as ar on l.area_id = ar.area_id join catagory as c  ON p.cat_id = c.cat_id WHERE property_id = ?";

    db.query(q,[Id], (err, data) => {
        if(err) return res.json(err)
        else return res.json(data[0])
    })

}





export const getPosts = (req, res) => {
  //  const q = req.query.cat ? "SELECT * FROM property WHERE "
}

export const getPost = (req, res) => {
    res.json("from controller")
}

export const addPost = (req, res) => {
    //res.json("from controller")

    const q =
          "INSERT INTO property (`phone`, `property_id`, `address`, `bedroom`,`washroom`, `balcony`, `property_type`, `availability_from`, `post_date`, `gender`, `rent`, `details`,`cat_id`, `loc_id`) VALUES (?)";
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
          req.body.cat_id,
          req.body.loc_id
          
        ];

        db.query(q, [values], (err, propertyRes) => {
        if(err) {
          console.log(err)
          res.status(500).json({message : 'error creating property'})
        }else{
          const propertyID = propertyRes.insertId;
          res.status(201).json({propertyID})
        }
        });


}

export const addImages = async  (req, res) => {

  

  try {
    const { images } = req.body;
    let property_id = req.params.id;

    const insertPromises = images.map(async img => {
      const q = "INSERT INTO img (img_url, property_id) VALUES (?)";
       property_id = req.params.id;
      const values = [
        `${img.url}`,
        req.params.id
      ]
      await db.query(q, [values]);
    });

    await Promise.all(insertPromises);

    return res.json({ message: "Images uploaded" });
  } catch (err) {
    console.error("Error uploading images:", err);
    return res.status(500).json({ error: "An error occurred while uploading images" });
 // const q = "INSERT INTO img (img_url, property_id)  VALUES (?)"

  // const {images} = req.body;
  // const property_id = req.params.id;


  

 // console.log(images)
 // console.log(property_id)

  // for (const img of images) {
  // const q = "INSERT INTO img (img_url, property_id)  VALUES (?)"
  // //  console.log(img.url)
  //  db.query(q,[`"${img.url}"`, property_id],(err,data) => {
  //   if(err) return res.json(err);
    
  // })
  // }
   // console.log(`"${img.url}"`)

   //return res.json({message : "img uploaded"})

    
  }

 
}


export const getImages = (req, res) => {
  const Id = req.params.id;

  const q = "SELECT img_url, img_id FROM img WHERE property_id = ?"

  db.query(q,[Id], (err, data) => {
    if(err) return res.json(err)
    else return res.json(data)
  })


}

export const deletePost = (req, res) => {
    res.json("from controller")
}

export const updatePost = (req, res) => {
    res.json("from controller")
}



// post Location routes

export const postLocation = (req, res) => {
 
  
  const loc_values = [
    req.body.sector_no,
    req.body.road_no,
    req.body.house_no,
    req.body.div_id,
    req.body.dis_id,
    req.body.area_id
  ];

  const q = "INSERT INTO location (`sector_no`, `road_no`, `house_no`, `div_id`, `dis_id` , `area_id`) VALUES ( ? )";


  db.query(q,[loc_values], (err, locationRes) => {
    if(err){
      console.error(err)
      res.status(500).json({message : "error creating location"})
    }else{
      const locationId = locationRes.insertId;

      res.status(201).json({locationId});
    }
  });
}

// get district callback


export const getDivision = (req, res) => {
    const q = "SELECT * FROM division"

    db.query(q, (err, data) => {
      if(err) return res.json(err)
      else return res.json(data)
    })
}

 