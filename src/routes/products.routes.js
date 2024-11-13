import { Router } from "express";
import {
addProducts,
getAllProduct
} from "../controllers/products.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {uploadMultiple} from "../middlewares/multiple_multer.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file
//secured routes

router.route("/add-product").post(uploadMultiple,addProducts);
router.route("/get-product").get(getAllProduct);
export default router;

