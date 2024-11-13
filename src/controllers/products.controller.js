import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Products } from "../models/products.model.js";

const addProducts = asyncHandler(async(req,res) =>{
    /* steps -:
        - get data from api
        -  validation of feilds
        - check use already exists : username,email
        -  file uploading
        - check images
        - check category creations with response & error handling
    */
        const productImages = req.files;
        const {name,description,price,category,discounts,coupons,tags,stock,attributes} = req.body;
        console.log(tags);
         // Validate essential fields
    if (!name || !price || !description) {
        return res.status(400).json(new ApiResponse(400, null, "Required fields are missing"));
      }

      // Handle uploaded images
      const imageFiles = req.files;
      if(!imageFiles){
        return res.status(400).json(new ApiResponse(400, null, "uploads max 1 images"));
      }

      let imageUrls = [];

      // If images were uploaded, process them (e.g., upload to Cloudinary)
      if (imageFiles && imageFiles.length > 0) {
        for (const file of imageFiles) {
          const result = await uploadOnCloudinary(file.path); // Uploads to Cloudinary or other storage
          imageUrls.push(result.url); // Collect URLs of uploaded images
        }
    }

    const parsedAttributes = attributes ? JSON.parse(attributes) : {};
    const discountsData = discounts === "0" ? null : discounts;
    const couponsData = coupons === "0" ? null : coupons;
    // Create a new product

    const newProduct =await Products.create({
      name: name,
      price:price,
      description: description,
      category: category || null, // Allows setting category to null
      owner : req.user._id,
      discounts: discountsData || null,
      coupons: couponsData || null,
      stock: stock || 0,
      tags: tags ? (tags) : [], // Parse tags array
      attributes: parsedAttributes,
      images: imageUrls
    });

    const newProductData = await Products.findById(newProduct._id)
    if (!newProductData) {
        throw new ApiError(500, "Something went wrong while Product creation")
    }

    return res.status(201).json(
        new ApiResponse(200, newProductData, "Product Created Successfully")
    )
})


const  getAllProduct =asyncHandler(async(req,res) => {
    const productByOwnerIdData = await Products.find({ owner: req.user._id });
    if(!productByOwnerIdData){
        throw new ApiError(204, "Products Data not Exists");
    }
    return res.status(201).json(
        new ApiResponse(201, productByOwnerIdData, "All Products List By Current Users")
    )
})

export {
    addProducts,
    getAllProduct
}


