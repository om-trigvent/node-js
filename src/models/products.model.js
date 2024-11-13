import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            index: true, // Index on name for faster search
        },
        price: {
            type: Number,
            required: true,
            index: true // Indexed for faster price range queries
        },
        description: {
            type: String,
            maxlength: 500
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category", // Assuming you have a Category model
            index: true,
            default: null,
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User",
            default: null,
        },
        discounts: {
            type: Schema.Types.ObjectId,
            ref: "Discounts", // Assuming you have a Category model
            index: true,
            default: null,
        },
        coupons :{
            type: Schema.Types.ObjectId,
            ref: "Coupons", // Assuming you have a Category model
            index: true,
            default: null,
        },
        stock: {
            type: Number,
            default: 0
        },
        tags: [String], // Array of tags for searchability
        createdAt: {
            type: Date,
            default: Date.now,
            index: true // Index by creation date for sorting
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        attributes: {
            // Flexible schema for storing additional product attributes
            color: String,
            size: String,
            weight: Number,
            dimensions: {
                width: Number,
                height: Number,
                depth: Number
            }
        },
        images: {
            type: [String], // Array of image URLs
            validate: {
                validator: (v) => Array.isArray(v) && v.length > 0,
                message: "At least one image is required.",
            },
        },
    },
    {
        timestamps: true
    }
);

productSchema.plugin(mongooseAggregatePaginate)

// Add compound indexes if needed
productSchema.index({ category: 1, price: -1 }); // Category and price for filtered queries

export const Products = mongoose.model("Product", productSchema);
