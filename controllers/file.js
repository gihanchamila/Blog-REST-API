const path = require("path");
const { validateExtention } = require("../validators/File");
const { uploadFileToS3, signedUrl, deleteFileFromS3 } = require("../utils/awsS3")
const {File} = require("../models")

const uploadFile = async (req, res, next) => {
    try{
        const {file} = req;
        
        if(!file){
            res.code = 400;
            throw new Error("File not selected")
        }

        const ext = path.extname(file.originalname)
        const isValidExt = validateExtention(ext)

        if(!isValidExt){
            res.code = 400;
            throw new Error("Only .jpg or .jpeg or .png is allowed")
        }

        const key = await uploadFileToS3({file, ext})
        if(key){
            const newFile = new File({
                key,
                size : file.size,
                mimetype : file.mimetype,
                createdBy : req.user._id
            })
            await newFile.save()
            res.status(201).json({ code : 201, status : true, message : "File uploaded successfully", data : { key, id: newFile._id }})
        }
        
    }catch(error){
        next(error)
    }
};

const getSignedUrl = async (req, res, next) => {
    try{
        const {key} = req.query
        const url = await signedUrl(key)

        res.status(200).json({ code : 200, status : true, message : "Get signed url successfully", data : {url}})
    }catch(error){
        next(error)
    }
};

const deleteFile = async (req, res, next) => {
    try{

        const {key} = req.query;
        await deleteFileFromS3(key)
        await File.findOneAndDelete({key})
        res.status(200).json({ code : 200, status : true, message : "File deleted successfully"})

    }catch(error){
        next(error)
    }
}

module.exports = {uploadFile, getSignedUrl, deleteFile}