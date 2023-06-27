const product = {
  test_mysql: {
    get_data: "/v1/product",
    post_data: "/v1/product",
    put_data: "/v1/product/3",
    delet_data: "/v1/product/4",
  },
  test_Sequelize: {
    get_data: "/v2/product",
    post_data: "/v2/product",
    put_data: "/v2/product/3",
    delet_data: "/v2/product/4",
  },
  test_mongodb: {
    get_data: "/v3/product",
    post_data: "/v3/product",
    put_data: "/v3/product/3",
    delet_data: "/v3/product/4",
  },
  test_Mongoose: {
    get_data: "/v4/product",
    post_data: "/v4/product",
    put_data: "/v4/product/3",
    delet_data: "/v4/product/4",
  },
};
module.exports = product;
