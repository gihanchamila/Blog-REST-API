const express = require("express")
const router = express.Router()
const {authController} = require("../controllers")
const {signupValidator, signinValidator, emailValidator, verifyUserValidator, recoverPasswordValidator, changePasswordValidator} = require("../validators/auth")
const validate = require("../validators/validate")
const isAuth = require("../middlewares/isAuth")

router.post("/signup", signupValidator, validate, authController.signup)
router.post("/signin", signinValidator, validate, authController.signin)
router.post("/send-verification-email", emailValidator, validate, authController.verifyCode)
router.post("/verify-user", verifyUserValidator, validate, authController.verifyUSer)
router.post("/forgot-password-code", emailValidator, validate, authController.forgotPasswordCode )
router.post("/recover-password", recoverPasswordValidator, validate, authController.recoverPassword)
router.put("/change-password", changePasswordValidator, validate, isAuth, authController.changePassword)
router.put("/update-profile",isAuth, authController.updateProfile)

module.exports = router;