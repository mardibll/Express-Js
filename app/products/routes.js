const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const productcontroller=require('./controller')
router.get("/product",productcontroller.data);
router.get("/product/:id",productcontroller.data_id);
router.post('/product/',upload.single('image_url'), productcontroller.upload_img)
router.put('/product/:id',upload.single('image_url'), productcontroller.update)
router.delete('/product/:id',productcontroller.destroy)













































// router.get("/", (req, res) => {
//   const { page, total } = req.query;
//   res.send({
//     status: "succes 200",
//     message: "Hallo ini adalah route",
//     page,
//     total,
//   });
// });

// router.get("/product/:id", (req, res) => {
//   res.send({
//     id: req.params.id,
//   });
// });

// router.post("/product/", upload.single("images"), (req, res) => {
//   const { name, price, stock, status } = req.body;
//   const images = req.file;
//   if (images) {
//     const target = path.join(__dirname, "uploads", images.originalname);
//     fs.renameSync(images.path, target);
//     res.json({ name, price, stock, status, images });
//     // res.sendFile(target)
//     console.log(req.file, "request files");
//   }
// });

// router.get("/:category/:tag", (req, res) => {
//   const { category, tag } = req.params;
//   res.json({
//     category,
//     tag,
//   });
// });

// app.post('/cover', upload.single('image'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })
module.exports = router;
