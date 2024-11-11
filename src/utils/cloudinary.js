// import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         //upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//          fs.unlinkSync(localFilePath)
//         // file has been uploaded successfull
//         console.log("here some response", response);
//         return false;

//         // return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }



// export {uploadOnCloudinary}


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // Check if the file path is valid
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      console.error("File path is invalid or file does not exist.");
      return null;
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto" // Automatically detect the resource type (image, video, etc.)
    });
    // After successful upload, delete the local file
    fs.unlinkSync(localFilePath);
    // Log the Cloudinary response for debugging
    console.log("File uploaded successfully:", response);
    // Return the Cloudinary response with URL and other details
    return response;

  } catch (error) {
    // Handle errors and ensure the temporary file is deleted if an error occurs
    console.error("Error uploading to Cloudinary:", error);

    // Check if the file exists before attempting to delete it
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null; // Return null if the upload fails
  }
};

export { uploadOnCloudinary };
