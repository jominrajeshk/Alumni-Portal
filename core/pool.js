const util=require('util');
const mysql=require('mysql');
//connection to the database
const pool=mysql.createPool ({
connectionLimit:10,
host:"us-cdbr-east-06.cleardb.net",
user:"bca12c1cb1dfde",
password:"7b4dcf76",
database:"heroku_d46b8aae512cbfb",
debug:false


});

pool.getConnection((err,connection)=>{
if(err)
console.log(err);
if(connection)
  connection.release();   
});

pool.query=util.promisify(pool.query);


module.exports=pool;