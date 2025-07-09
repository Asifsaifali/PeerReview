import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    githubId :{
        type : String,
        required: true,
    },
    username : {
        type : String,
        required: true,
    },
    avatarUrl :{
        type : String,
        required: true,
    },
    
}, {timestamps : true})


const User = mongoose.model("User", userSchema)
export default User;