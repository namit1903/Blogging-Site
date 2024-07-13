const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//use this funtion when we have to save on cloudinary from server / temprory local storage se cloudinary pr dalna ho tb
const uploadOnCloudinary=async(localFilePath)=>{
  try
{if(!localFilePath) return null;
const response=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
console.log("file has been uploaded",response)
return response;
}

catch(error){
fs.unlink(localFilePath)//very important for optimization= remove the temporary locally saved files
console.log(error)
return null
}
}
module.exports = { uploadOnCloudinary, cloudinary };