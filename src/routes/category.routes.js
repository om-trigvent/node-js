import { Router } from "express";
import {
addCategories,
getAllCategories,
getCategoryById,
updateCategoryData,
getAllCategoryAndSubCategory,
deleteCategory
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file
//secured routes
router.route("/add-category").post(upload.single('image'),addCategories);
router.route("/all-categories").get(getAllCategories);
router.route("/get-category").get(getCategoryById);
router.route("/update-category").patch(upload.single("image"), updateCategoryData);
router.route("/get-category-and-sub-category").get(getAllCategoryAndSubCategory);
router.route("/delete-category").delete(deleteCategory);
export default router;

