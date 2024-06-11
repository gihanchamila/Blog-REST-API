const multer = require("multer")
const path = require("path")
const generateCode = require("../utils/generateCode")

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },

    filename: (req, file, callback) => {
        // original_file_name_12_digit_random_number.ext
        const mimetype = file.mimetype;

        if(
            mimetype === "image/jpg"  ||
            mimetype === "image/jpeg" ||
            mimetype === "image/png"  ||
            mimetype === "application/pdf"
        ){
            const originalName = file.originalname;
            const extension = path.extname(originalName)
            const fileName = originalName.replace(extension, "")
            const compressedFilename = fileName.split(" ").join("_")
            const lowercaseFilename = compressedFilename.toLocaleLowerCase();
            const code = generateCode(12)
            const finalFile = `${lowercaseFilename}_${code}${extension}`

            callback(null, finalFile)
           
        }else {
            callback(
                new Error("Only jpg or jpeg or png or pdf format is allowed")
            )
        }

        
    }
});

const upload = multer({
    storage
});

module.exports = upload