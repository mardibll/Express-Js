const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const productscontroler = require("./control");
router.get("/product", productscontroler.data);
router.get("/product/:id", productscontroler.data_id);
router.post("/product", upload.single("image_url"), productscontroler.post);
router.put("/product/:id", upload.single("image_url"), productscontroler.update);
router.delete("/product/:id", productscontroler.deleteProduct);
module.exports = router;
