import {v2 as cloudinary} from 'cloudinary';
const connectCloudinary = async() => {
   console.log("Cloudinary connected");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}); 
}

// if we want to upload any image in cloundinary we can use this function
// export const uploadImage = async (filePath) => {
//     try {
//         const result = await cloudinary.uploader.upload(filePath, {
//             folder: 'prescripto'
//         });
//         return result.secure_url;
//     } catch (error) {
//         console.error('Error uploading image to Cloudinary:', error);
//         throw error;
//     }
// };
export default connectCloudinary;