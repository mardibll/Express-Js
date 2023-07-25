// require("./config/mongose");
import express from "express";
import path from 'path'

var app = express();
import productsrouter from "./app/products/routes.js"

// const productsrouterV2 = require("./app/products_v2/routes");

// const productsrouterV3 = require("./app/productts_v3/routes");
// const productsrouterV4 = require("./app/products_v4/routes");
import menu from "./menu.js"
// const logs = require("./middlewares/longgers");
import longger from "morgan"
app.use(longger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", productsrouter);

// app.use("/api/v2", productsrouterV2);

// app.use("/api/v3", productsrouterV3);
// app.use("/api/v4", productsrouterV4);

app.use("/api", (req, res) => {
  res.send(menu);
});
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: "resource" + req.originalUrl + "not found",
  });
});
app.listen(3001, () => console.log("server: http://localhost:3001/api"));
// import express from "express";
// const app = express();

// const route = express.Router();

// route.get("/", (req, res) => {
//   res.send("Halo, selamat datang di halaman utsqqwama!");
// });
// app.use(route);
// const port = 3000;

// app.listen(port, () => {
//   console.log(`Server berjalan di http://localhost:${port}`);
// });