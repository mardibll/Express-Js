const mysql=require('mysql')
const conenction=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'@135790eL',
    database:'eduwork-cruds'
})
module.exports=conenction