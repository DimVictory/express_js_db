import express from 'express'
import { config } from "dotenv"
config();
import pool from "./db_connect/database.js";
import newRouter from './routes/newRoute.js';
const PORT = process.env.PORT;
const app = express();




app.use(express.json())
app.use(express.urlencoded({extended : true}))


pool.getConnection((error,connection)=>{
    if(error){
        console.log("Error Connect To Database");
    }
    console.log("Success connected to Database");
    connection.release();
})

app.use('',newRouter);

app.listen(PORT, ()=>{
    console.log(`Running on server https://${PORT}`);
})