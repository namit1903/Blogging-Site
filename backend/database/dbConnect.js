const mongoose=require('mongoose');

const connectDB=async()=>{
  try{
     const response= await mongoose.connect(process.env.MONGO_URL);
      // console.log("repsonse is :",response)
      console.log("database is connected successfully!")

  }
  catch(err){
      console.log("Database is not connected :",err)
  }
};
module.exports = connectDB;