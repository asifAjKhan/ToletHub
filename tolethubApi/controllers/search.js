import db from "../database.js";


 

export const getDivisionProperty = (req,res) => {
    const q = "select count(divi.div_name) AS num , divi.div_name from property AS p JOIN location AS l ON p.loc_id = l.loc_id JOIN division AS divi  ON l.div_id = divi.div_id   Group By (divi.div_name) ORDER BY divi.div_name"

    db.query(q,(err, data) => {
        if(err) return res.json(err)
        else return res.json(data)
    })
}

export const getCatagorysProperty = (req, res) => {
    const q = "select count(cat_name) as catCount , cat_name from property as p join catagory as c on p.cat_id = c.cat_id group by (cat_name)";


    db.query(q, (err, data) => {
        if(err) return res.json(err)
        else return res.json(data)
    })
}


export const getPropertySearch = (req, res) => {

   
    const { startDate, endDate, Min,Max} = req.body.data;


  //  console.log(req.body.data)
  //  console.log(req.body.params)


    const {rooms, washRooms, balcony, selectedDivi, selectedDis, selectedArea } = req.body.params;
    // console.log(rooms)
    // console.log(washRooms)
    // console.log(balcony)
    // console.log(district)
    // console.log(division)
    // console.log(area)
    // console.log(Min)
    // console.log(Max)

    //console.log(req.body)
    
    let q =`SELECT p.property_id, p.phone, p.address, p.bedroom, p.washroom, p.balcony , p.property_type, p.gender, p.availability_from, p.post_date,divi.div_name, dis.dis_name, ar.area_name, p.rent, p.details  FROM property AS p JOIN location AS l   ON p.loc_id = l.loc_id   JOIN division AS divi   ON l.div_id = divi.div_id   JOIN distric AS dis   ON l.dis_id = dis.dis_id    JOIN area AS ar  ON l.area_id = ar.area_id `;

    if(rooms){
        q+= `WHERE p.bedroom = ${rooms} `

        if(washRooms){
            q+= `AND p.washroom = ${washRooms} `

            if(balcony){
                q+= ` AND p.balcony = ${balcony} `
            }
        }
    }

    

    

    if(Min){

       if(Max){
        q+= ` AND p.rent >= ${Min} AND p.rent <= ${Max} `
       }
    }

    if(selectedDivi){
        q+= ` AND divi.div_name = '${selectedDivi}' `

        if(selectedDis){
            q+= ` AND dis.dis_name = '${selectedDis}' `

            if(selectedArea){
                q+= ` AND ar.area_name = '${selectedArea}' `
            }
        }
    }

    if(endDate){
        if(startDate)
        q+= `AND p.availability_from  BETWEEN '${startDate}' AND '${endDate}' `
    }

    
    db.query(q,(err, result) => {
        if(err) return res.json(err)
        else{
         // console.log(data)
          return res.json(result);

         //return res.json({message : "fuck you motherfucker"})
        }

    
    })


}