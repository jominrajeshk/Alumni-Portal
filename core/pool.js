const util=require('util');
const mysql=require('mysql');
//connection to the database
const pool=mysql.createPool ({
connectionLimit:10,
host:"localhost",
user:"root",
password:"password",
database:"alumni",
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