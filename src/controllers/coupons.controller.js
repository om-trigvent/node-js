import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Products } from "../models/products.model.js";

const addCoupons = asyncHandler(async(req,res) =>{
    /* steps -:
        - get data from api
        -  validation of feilds
        - check use already exists : username,email
        -  file uploading
        - check images
        - check category creations with response & error handling
    */

        console.log('dshjvb');
})




export {
    addCoupons,
}


