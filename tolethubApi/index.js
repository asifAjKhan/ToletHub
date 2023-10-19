import express from 'express';
import db from './database.js';
import route from './routes/route.js';
import cors from 'cors';
import authRouter from './routes/auths.js';

import cookieParser from 'cookie-parser';
import PostRouter from './routes/posts.js';
import search from './routes/search.js';

import bodyParser from 'body-parser';


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


//app.use(cors())

app.use("*", cors({
    origin : true,
    credentials : true
}))

app.use(route);
app.use("/auth", authRouter);
app.use("/property", PostRouter);
app.use(search);








app.listen(8000, ()=>{
    console.log("server is now online, hello from server");
})