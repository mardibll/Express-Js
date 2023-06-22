const conenction = require("../../config/mysql");
const path = require("path");
const fs = require("fs");

const data = (req, res) => {
  const {search}=req.query
  let exec={}
  if (search) {
    exec={
      sql: "SELECT * FROM products WHERE name LIKE ?",
      values:[`%${search}%`]
    }
  } else {
    exec={
      sql: "SELECT * FROM products "
    }
  }
  conenction.query(exec, _response(res));
};

// const data = (req, res) => {
//   conenction.query(
//     {
//       sql: "SELECT * FROM products ",
//     },
//     _response(res)
//   );
// };

const data_id = (req, res) => {
  conenction.query(
    {
      sql: "SELECT * FROM products WHERE id= ?",
      values: [req.params.id],
    },
    _response(res)
  );
};


const upload_img = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const images = req.file;
  if (images) {
    const target = path.join(__dirname, "../../uploads", images.originalname);
    fs.renameSync(images.path, target);
    conenction.query(
      {
        sql: "INSERT INTO products (users_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)",
        values: [
          parseInt(users_id),
          name,
          price,
          stock,
          status,
          `http://localhost:3001/public/${images.originalname}`,
        ],
      },
      _response(res)
    );
  }
};
const update = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const images = req.file;
  let sql = "";
  let values = [];
  if (images) {
    const target = path.join(__dirname, "../../uploads", images.originalname);
    fs.renameSync(images.path, target);
    sql ="UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?";
    values = [ parseInt(users_id), name,price, stock,status,`http://localhost:3001/public/${images.originalname}`,req.params.id]
  }else{
    sql ="UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url=NULL WHERE id = ?";
    values = [ parseInt(users_id), name,price, stock,status,req.params.id]
  }conenction.query({sql,values},_response(res))
};

const destroy = (req, res) => {
  conenction.query(
    {
      sql: "DELETE FROM products WHERE id= ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const _response = (res) => {
  return (error, result) => {
    if (error) {
      res.send({
        status: "failed",
        response: error,
      });
    } else {
      res.send({
        status: "succes",
        response: result,
      });
    }
  };
};
module.exports = { data, data_id, upload_img,update,destroy };
