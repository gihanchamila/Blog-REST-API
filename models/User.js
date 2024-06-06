const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: { type : String, required : true},
    email: {type : String, required : true, unique : true, trim : true},
    password: {type : String, required : true, minlength : 6},
    // role 1 : super-admin, role 2 : admin, role 3 : user
    role: {type : Number, default : 3},
    verificationCode : String,
    forgotPasswordCode : String,
    isVerified : {type : Boolean, default : false}
}, {
    timestamps : true
});

const User = mongoose.model("user", userSchema)
module.exports = User
