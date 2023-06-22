var express = require("express");
const path = require("path");

var app = express();
const productsrouter = require("./app/products/routes");
const productsrouterV2 = require("./products_v2/routes");
// const logs = require("./middlewares/longgers");
const longger=require("morgan")
app.use(longger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use('/api/v1',productsrouter);
app.use('/api/v2',productsrouterV2);
// app.use("/", (req, res) => {
//   res.send({
//     status: "succes",
//     Message: "halooo",
//   });
// });
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: "resource" + req.originalUrl + "not found",
  });
});
app.listen(3001, () => console.log("server: http://localhost:3001/api/v2/product"));
