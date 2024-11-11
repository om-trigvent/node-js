import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try{
        const connectionInstances = await mongoose.connect(`${process.env.MONOGODB_URI}`);
        console.log(`\n MongoDB Connected !! DB Host ${connectionInstances.connection.host}`)
    } catch(error){
        console.error('MongoDB connection error :',error);
        process.exit(1);
    }
}

export default connectDB