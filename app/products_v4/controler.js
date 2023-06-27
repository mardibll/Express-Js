const product = require("./model");
const path = require("path");
const fs = require("fs");
const get_data = (req, res) => {
  product
    .find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const get_id = (req, res) => {
  const id = req.params.id;
  product
    .findById(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const post_data = (req, res) => {
  const { name, price, stock, status } = req.body;
  const images = req.file;
  console.log(images);
  if (images) {
    const target = path.join(__dirname, "../../uploads", images.originalname);
    fs.renameSync(images.path, target);
    product
      .create({
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3001/public/${images.originalname}`,
      })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    product
      .create({
        name,
        price,
        stock,
        status,
      })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};
const update_data = (req, res) => {
  const id = req.params.id;
  const { name, price, stock, status } = req.body;
  const images = req.file;
  console.log(images);
  if (images) {
    const target = path.join(__dirname, "../../uploads", images.originalname);
    fs.renameSync(images.path, target);
    product
      .findByIdAndUpdate(
        id,
        {
          name,
          price,
          stock,
          status,
          image_url: `http://localhost:3001/public/${images.originalname}`,
        },
        { new: true }
      )
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    product
      .findByIdAndUpdate(
        id,
        { name, price, stock, status, image_url: null },
        { new: true }
      )
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};
const delete_data = (req, res) => {
  const id = req.params.id;

  product
    .findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
module.exports = { get_data, get_id, post_data, update_data, delete_data };
