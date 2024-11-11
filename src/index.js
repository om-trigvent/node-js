// require('dotenv').config({path : '/.env'});
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import connectDB from './db/index.js';
import {app} from './app.js'

dotenv.config({
    path : '/.env'
})
connectDB().then(
() => {
    app.listen(process.env.PORT || 9000,()=>{
        console.log('Server is running port',process.env.PORT);
    })
}
).catch((err) => {
console.error('Database connection Lost !!',err);
});

// const app = express();



// (async () => {
//     try{
//        await mongoose.connect(`${process.env.MONOGODB_URI}`);
//        app.on("error",(error)=> {
//             console.log("Error : ", error);
//             throw error;
//        })
//        app.listen(process.env.PORT,() => {
//         console.log('App is running port',process.env.PORT);
//        });
//     } catch(error){
//         console.error("ERROR : ",error);
//     }
// })()