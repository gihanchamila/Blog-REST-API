const express = require("express")
const router = express.Router()
const isAuth = require("../middlewares/isAuth")
const {fileController} = require("../controllers")

router.post("/upload", isAuth, fileController.uploadFile )

module.exports = router