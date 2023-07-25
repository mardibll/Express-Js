const mysql=require('mysql')
const conenction=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'email',
    database:'eduwork-cruds'
})
module.exports=conenction
