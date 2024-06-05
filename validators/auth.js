const { check } = require("express-validator")

const signupValidator = [
    check("name").notEmpty().withMessage("Name is required"),

    check("email")
        .isEmail()
        .withMessage("Invalid email")
        .notEmpty()
        .withMessage("Email is required"),
    
    check("password")
        .notEmpty()
        .withMessage("Invalid password")
        .isLength({min : 6})
        .withMessage("Password should be 6 characters long")
]

module.exports = { signupValidator }