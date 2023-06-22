const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const product_V2= require('./control')

router.post("/product", upload.single("image"),product_V2.data_post)
router.get("/product",product_V2.get_data);
router.get("/product/:id",product_V2.get_id);
router.put("/product/:id", upload.single("image"),product_V2.update);
router.delete("/product/:id",product_V2.delete_data);
module.exports = router;