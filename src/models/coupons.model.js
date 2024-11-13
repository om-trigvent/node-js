import mongoose,{Schema} from "mongoose";
import { User } from "./user.model";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const couponSchema = new Schema(
    {
        Coupons :  {
            type : String,
            required : true,
        },
        price :  {
            type : String,
            required : true,
        },
        coupon_start_date: {
            type: Date,
            required: true,
        },
        coupon_end_date: {
            type: Date,
            required: true,
        },
        code : {
            type : String,
            required : true,
        },
        isActive : {
            type : Boolean,
            default : true
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
couponSchema.plugin(mongooseAggregatePaginate)

export const Coupons = mongoose.model('Coupons',couponSchema)