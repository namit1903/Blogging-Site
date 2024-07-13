const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        // enum:['om','namit','tony'] 
        // enum restricts the value of username to predefined set of values
    },
    email:{
        type:String,
        required:[true,"email is required bruh!!"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
            return v && v.length>=6
        },
        messages:"password is too short"
    },
        // min:[6,"Password is too short"]-->not valid for strings
        
    }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema)

