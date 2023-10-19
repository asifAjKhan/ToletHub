import db from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //check existing user

  const q = "SELECT * FROM register WHERE phone = ? OR username = ?";

  db.query(q, [req.body.phone, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("user already exists!");

    // Hash the password and create a register

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO register (`username`, `password`, `phone`, `email`) VALUES (?)";
    const values = [req.body.username, hash, req.body.phone, req.body.email];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Register has been successfully created");
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM register WHERE phone = ?";

  db.query(q, [req.body.phone], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // check the hash password
    const isPasswordRight = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordRight)
      return res.status(400).json("Wrong phone or password!");

    //json web token staff

    const token = jwt.sign({ phone: data[0].phone }, "secretKey");

    const { password, ...other } = data[0];

    // res.json(
    //   {
    //     password : data[0].password,
    //     username : data[0].username,
    //     token
    //   }
    // )

    // res.cookie("Access_token", token)

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true
    })
    .status(200)
    .json("User has been logout");
};
