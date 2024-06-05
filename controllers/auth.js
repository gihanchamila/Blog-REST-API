const {User} = require("../models");
const hashPassword = require("../utils/hashPassword")
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");

const signup = async (req, res, next) => {
    try{
        const {name, email, password, role} = req.body

        const isEmailExist = await User.findOne({email});
        if(isEmailExist){
            res.code = 400;
            throw new Error("Email is already exit")
        }
        
        const hashedPassword = await hashPassword(password)

        const newUser = new User({
            name,
            email,
            password : hashedPassword,
            role
        });
        
        
        await newUser.save()
        res.status(201).json({code : 201, status : true, message : "User registered successfully"})
    }catch(error){
        next(error)
    }
};

const signin = async (req, res, next) => {
    try{

        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            res.code = 401
            throw new Error("Invalid credentials")
        }

        const match = await comparePassword(password, user.password);
        if(!match){
            res.code = 401
            throw new Error("Invalid credentials")
        }

        const token = generateToken(user)

        res.status(200).json({ code : 200, status : true, message : "User signin successfull", data : {token}})

    }catch(error){
        next(error)
    }
}

module.exports = {signup, signin}