const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/product.controller")
const multer = require('multer');
const storageMulter = require('../../../helpers/multer');
const upload = multer({ storage : storageMulter() });
router.get('/', controller.index)
router.delete("/delete/:id",controller.delete)
router.get('/create',controller.create)
router.post('/create-product',upload.single('thumbnail') ,controller.createProduct)
router.patch('/change-status/:status/:id',controller.changeStatus)
router.patch('/change-multi', controller.changeMulti)
module.exports = router;
