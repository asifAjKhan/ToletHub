// import express from 'express';
// import mysql from 'mysql';

// const app = express();

// app.use(express.json());

// const db = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password : "root123",
//     database : "test"
// })

// app.get('/', (req, res) => {
//     res.json("hello this is from the backend")
// })

// app.get("/books", (req, res) => {
//     const q = "SELECT * FROM books"
//     db.query(q,(err, data) => {
//        if(err) return res.json(err)
//        return res.json(data) 
//     })
// })



// app.post("/books", (req, res) => {
//     const q = "INSERT INTO books (`title`, `dese`, `cover`, `price`) VALUES (?)";
//     const values = [
//         req.body.title,
//         req.body.dese,
//         req.body.cover,
//         req.body.price
//     ];

//     db.query(q, [values], (err, data) => {
//         if(err) return res.json(err)
//         return res.json("Book has been created") 
//     })
// })


// app.delete("/books/:id", (req, res) => {
//     const bookId = req.params.id;
//     const q = "DELETE FROM books WHERE id = ?"

//     db.query(q,[bookId], (err, data) => {
//         if(err) return res.json(err)
//         return res.json("Book has been deleted successfully");
//     })
// })

// app.put("/books/:id", (req,res) => {
//     const bookId = req.params.id;
//     const q = "UPDATE books SET `title` = ?, `dese` = ? , `cover` = ?,  `price` = ? WHERE id = ? ";
    
//     const values = [
//         req.body.title,
//         req.body.dese,
//         req.body.cover,
//         req.body.price
//     ]

//     db.query(q,[...values, bookId], (err, data) => {
//         if(err) return res.json(err);
//         return res.json("Books has been updated successfully");
//     })
// })




// app.listen(8800, () => {
//     console.log("server in online now");
// })