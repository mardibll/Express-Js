const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "field name harus ada"],
    minlenght:[3,"min 3 karakter"],
    maxlenght: [50,'max 50 karakter']
  },
  price: {
    type: Number,
    require: true,
    min: [1000,'min harga : 1000'],
    max: [100000000, 'max harga : 100000000']
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true,
  },
  image_url: {
    type: String,
    default: null,
  },
});
const product = mongoose.model("product", productSchema);
module.exports = product;
