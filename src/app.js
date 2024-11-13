import express, { json } from 'express';
import cors from 'cors';
import cookieParser  from 'cookie-parser';

const app =express();
// for routes optimizations cross origin refresence sites

app.use(cors({
    origin : process.env.CORS_ORIGIN || 'http://localhost:8000',
    credentials:true,
}));
//  json files limits
app.use(express.json({
    limit:"16kb"}
));
// nested urls useses
app.use(express.urlencoded(
 {extended : true,limit:"16kb"}
));
//  statticfiles like (imges,css)
app.use(express.static("public"));
//  cookiee
app.use(cookieParser());
//routes import
import userRouter from './routes/user.routes.js'
import categoryRouter from './routes/category.routes.js'
import productRouter from './routes/products.routes.js'
import couponRouter from './routes/coupos.routes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/coupons",couponRouter)

export {app}