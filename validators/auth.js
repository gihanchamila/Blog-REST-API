const { check } = require("express-validator")

const signupValidator = [
    check("name")
        .notEmpty()
        .withMessage("Name is required"),

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
];

const signinValidator = [
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),

    check("password")
        .notEmpty()
        .withMessage("Password is required")
];

const emailValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid Email")
        .notEmpty()
        .withMessage("Email is required")
];

const verifyUserValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid Email")
        .notEmpty()
        .withMessage("Email is required"),

    check("code")
        .notEmpty()
        .withMessage("code is required")
];

const recoverPasswordValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid Email")
        .notEmpty()
        .withMessage("Email is required"),
    
    check("code")
        .notEmpty()
        .withMessage("code is required"),
    
    check("password")
        .isLength({min : 6})
        .withMessage("Password should be 6 characters long")
        .notEmpty()
        .withMessage("Password is required")
        
];

const changePasswordValidator = [
    check("oldPassword")
        .notEmpty()
        .withMessage("Old password is required"),

    check("newPassword")
        .notEmpty()
        .withMessage("New password is required")
]

module.exports = { signupValidator, signinValidator, emailValidator, verifyUserValidator ,recoverPasswordValidator, changePasswordValidator }