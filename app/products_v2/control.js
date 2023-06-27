const model = require("./model");
const path = require("path");
const fs = require("fs");

const data_post = async (req, res) => {
  try {
    const { users_id, name, price, stock, status } = req.body;
    const image = req.file;
    console.log(image);
    if (image) {
      const targetPath = path.join(
        __dirname,
        "../../uploads",
        image.originalname
      );
      fs.renameSync(image.path, targetPath);

      await model.sync();

      const result = await model.create({
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3001/public/${image.originalname}`,
      });

      res.send(result);
    } else {
      await model.sync();
      const result = await model.create({
        users_id,
        name,
        price,
        stock,
        status,
        image_url: null,
      });

      res.send(result);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const get_data = async (req, res) => {
  try {
    const products = await model.findAll();

    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const get_id = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await model.findOne({ where: { id: productId } });

    if (product) {
      res.send(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const update = async (req, res) => {
  try {
    const { users_id, name, price, stock, status } = req.body;
    const image = req.file;
    console.log("inidatasdjhjh", image);
    let imageUrl = null;
    if (image) {
      const targetPath = path.join(
        __dirname,
        "../../uploads",
        image.originalname
      );
      fs.renameSync(image.path, targetPath);
      imageUrl = `http://localhost:3001/public/${image.originalname}`;
    }
    const product = await model.findByPk(req.params.id);
    console.log("1ini data product", product);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    product.users_id = parseInt(users_id);
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.status = status;
    product.image_url = imageUrl;
    await product.save();
    res.send("Product updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to update product");
  }
};
const delete_data = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await model.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    await product.destroy();
    res.send("Product deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete product");
  }
};
module.exports = { data_post, get_data, get_id, update, delete_data };
