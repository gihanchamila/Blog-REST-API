const path = require("path");
const { validateExtention } = require("../validators/file");
const { uploadFileToS3 } = require("../utils/awsS3")
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
        }

        res.status(201).json({ code : 201, status : true, message : "File uploaded successfully", data : { key }})
    }catch(error){
        next(error)
    }
};

module.exports = {uploadFile}