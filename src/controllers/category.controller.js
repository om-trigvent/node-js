import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Category } from "../models/category.model.js"


const addCategories = asyncHandler(async(req, res) => {
    /* steps -:
        - get data from api
        -  validation of feilds
        - check use already exists : username,email
        -  file uploading
        - check images
        - check category creations with response & error handling
    */
    const {category_name,description,parent_id} = req.body;
    if (
        [category_name, description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const categoryImages = req.file?.path
    if (!categoryImages) {
        throw new ApiError(400, "category file is required")
    }
    const categoriesCloudnaryImages = await uploadOnCloudinary(categoryImages);
    const parent_id_value = parent_id === "0" ? null : parent_id;

    const category = await Category.create({
        category_name,
        image: categoriesCloudnaryImages.url,
        description : description,
        owner : req.user._id,
        parent_id : parent_id_value
    })

    const categoryData = await Category.findById(category._id)
    if (!categoryData) {
        throw new ApiError(500, "Something went wrong while Creating Category")
    }

    return res.status(201).json(
        new ApiResponse(200, categoryData, "Category Created Successfully")
    )
});


const getAllCategories = asyncHandler(async(req,res) => {
    const categoriesByOwner = await Category.find({ owner: req.user._id });
    if(!categoriesByOwner){
        throw new ApiError(204, "Category Data not Exists");
    }
    return res.status(201).json(
        new ApiResponse(201, categoriesByOwner, "All Category List By Current Users")
    )

})

const getCategoryById  =asyncHandler(async(req,res) => {
    const {id} = req.query
    const categoriesData = await Category.findById(id);
    if(!categoriesData){
        throw new ApiError(204, "Category Data not Exists");
    }
    return res.status(201).json(
        new ApiResponse(201, categoriesData, "Category data get Successfully")
    )
})

const updateCategoryData = asyncHandler(async(req, res) => {
    const { category_id, category_name, description, is_published, parent_id } = req.body;
    if (!category_name || !description) {
        throw new ApiError(400, "All fields are required");
    }

    // Determine if parent_id is "0", and set it to null if true
    const parent_id_value = parent_id === "0" ? null : parent_id;

    // Check if an image is uploaded
    const categoryImages = req.file?.path;
    let updatedData = {
        category_name: category_name,
        description: description,
        parent_id: parent_id_value,
    };

    // If a new category image is provided, upload it and add the URL to the data
    if (categoryImages) {
        const categoriesCloudnaryImages = await uploadOnCloudinary(categoryImages);
        updatedData.image = categoriesCloudnaryImages.url ? categoriesCloudnaryImages.url : '';
    }
    // Update the category data
    const categoryData = await Category.findByIdAndUpdate(
        category_id,
        {
            $set: updatedData
        },
        { new: true } // Return the updated category document
    );

    if (!categoryData) {
        throw new ApiError(404, "Category not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, categoryData, "Category updated successfully"));
});

const getAllCategoryAndSubCategory= asyncHandler(async(req,res)=> {
    const ownerId = req.user._id;

    // Aggregation pipeline to recursively fetch categories and their subcategories
    const categoriesWithSubcategories = await Category.aggregate([
        // Match only the root categories (parent_id is null)
        { $match: { owner: ownerId, parent_id: null } },

        // Recursive lookup to populate subcategories up to multiple levels
        {
            $graphLookup: {
                from: "categories", // MongoDB collection name (note: this is typically lowercase plural in MongoDB)
                startWith: "$_id", // Start with the current category's ID
                connectFromField: "_id", // Field in the current document to match with connectToField
                connectToField: "parent_id", // Field to connect with in other documents (the parent_id in the other categories)
                as: "subcategories", // Output array name to store subcategories
                depthField: "level", // Optional, indicates how deep each subcategory is (1st level, 2nd level, etc.)
                maxDepth: 5 // Optional, limits the recursive depth (set based on your needs)
            }
        }
    ]);

    // If no categories found
    if (!categoriesWithSubcategories || categoriesWithSubcategories.length === 0) {
        throw new ApiError(204, "No category data found");
    }

    return res.status(200).json(
        new ApiResponse(200, categoriesWithSubcategories, "Categories with Subcategories")
    );
})


const deleteCategory = asyncHandler(async(req,res) => {
    const {id} = req.query
    const categoriesData = await Category.findById(id);
    if(!categoriesData){
        throw new ApiError(204, "Category Data not Exists");
    }
    const categories = await Category.findByIdAndDelete(
        id
    )
    return res.status(200).json(
        new ApiResponse(200, {}, "Categories Deleted Successfully")
    );
})

export {
    addCategories,
    getAllCategories,
    getCategoryById,
    updateCategoryData,
    getAllCategoryAndSubCategory,
    deleteCategory
}


