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

app.use("/api/v1/users", userRouter)

export {app}