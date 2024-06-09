const express = require("express")
const router = express.Router()
const {categoryController} = require("../controllers")
const {addCategoryValidator, idValidator} = require("../validators/category")
const validate = require("../validators/validate")
const isAuth = require("../middlewares/isAuth")
const isAdmin = require("../middlewares/isAdmin")

router.post("/", isAuth, isAdmin, addCategoryValidator,  validate, categoryController.addCategory) // use isAdmin after isAuth
router.put("/:id", isAuth, isAdmin, idValidator, validate, categoryController.updateCategory )
router.delete("/:id", isAuth, isAdmin, idValidator, validate, categoryController.deleteCategory)

module.exports = router;