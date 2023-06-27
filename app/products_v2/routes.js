const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const product_V2= require('./control')

router.get("/product",product_V2.get_data);
router.get("/product/:id",product_V2.get_id);
router.post("/product", upload.single("image_url"),product_V2.data_post)
router.put("/product/:id", upload.single("image_url"),product_V2.update);
router.delete("/product/:id",product_V2.delete_data);
module.exports = router;