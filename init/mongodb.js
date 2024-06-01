const mongoose = require("mongoose")
const {conectionUrl} = require("./config/kyes")

const connectMongodb = async() => {
    try{
        await mongoose.connect(conectionUrl)
        console.log("Database connection successfull")
    }catch(error){
        console.log(error.message)
    }
}

module.exports = connectMongodb