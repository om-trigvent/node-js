import mongoose,{Schema} from "mongoose";
import { User } from "./user.model.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const categorySchema = new Schema(
    {

        image :  {
            type : String, // cloudnnary urls
            required : true,
        },
        category_name :  {
            type : String,
            required : true,
        },
        parent_id : {
            type: Schema.Types.ObjectId,
            ref: "Category", // Refers to the Category model for hierarchical relationships
            default: null, // Use `null` to signify root categories
        },
        description :  {
            type : String,
            required : true,
        },
        isPublished :{
            type : Boolean,
            default : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {
        timestamps : true
    }
)



categorySchema.plugin(mongooseAggregatePaginate)

export const Category = mongoose.model('Category',categorySchema)