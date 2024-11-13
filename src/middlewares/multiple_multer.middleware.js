import multer from "multer";

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // Destination folder where files will be uploaded
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Filename with timestamp to avoid conflicts
    },
});

// Middleware to handle multiple image uploads (limit to a maximum of 5 images)
export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    },
});

// Handle multiple image uploads for the 'images' field
export const uploadMultiple = upload.array("images", 20); // Max of 5 images per request
