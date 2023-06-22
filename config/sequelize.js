const Sequelize = require("sequelize");

const sequelizeInstance = new Sequelize({
  database: "eduwork_cruds_v2",
  host: "localhost",
  username: "root",
  password: "@135790eL",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelizeInstance.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
module.exports=sequelizeInstance