const mongoose = require("mongoose")

const fileSchema = mongoose.Schema({
    key : {type : String, required : true},
    size : Number,
    mimeType : String,
    createdBy : {type : mongoose.Types.ObjectId, ref : "user"}
}, {
    timeStamps : true
});

const File = mongoose.model("file", fileSchema)
module.exports = File