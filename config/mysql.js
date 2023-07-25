import mysql from "mysql";
const conenction = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@135790eL",
  database: "eduwork-cruds",
});
export default conenction;
