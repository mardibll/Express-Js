const { ObjectId } = require("bson");
const db = require("../../config/mongodb");
const path = require("path");
const fs = require("fs");
const data = (req, res) => {
  db.collection("product")
    .find()
    .toArray()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const data_id = (req, res) => {
  const { id } = req.params;
  db.collection("product")
    .findOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const post = (req, res) => {
  const { name, price, stock, status } = req.body;
  const images = req.file;
  console.log(images);
  if (images) {
    const target = path.join(__dirname, "../../uploads", images.originalname);
    fs.renameSync(images.path, target);
    db.collection("product")
      .insertOne({
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3001/public/${images.originalname}`,
      })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
  db.collection("product")
    .insertOne({
      name,
      price,
      stock,
      status,
    })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const update = (req, res) => {
  const { name, price, stock, status } = req.body;
  const productId = req.params.id;
  db.collection("product")
    .updateOne(
      { _id: new ObjectId(productId) },
      {
        $set: {
          name,
          price,
          stock,
          status,
        },
      }
    )
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const deleteProduct = (req, res) => {
  const productId = req.params.id;

  db.collection("product")
    .deleteOne({ _id: new ObjectId(productId) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
module.exports = { data, data_id, post, update, deleteProduct };
