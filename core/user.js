const pool=require('./pool');
const bcrypt=require('bcrypt');

function User()
{

};
User.prototype={
    //find user data by id or username
    find: function(user=null,callback)
    {   console.log('hello');
        var field;
        if(user)
        {
         field=Number.isInteger(user)?'id':'username';
        }
        let sql='SELECT * FROM users WHERE username=? ';
        pool.query(sql,user,function(err,result)
        {
          if (err) throw err;
          if(result.length)
          {   
              callback(result[0]);
          }
          else{
              callback(null);
          }
        });
    }
,

    create: function(body,callback)
    {
        let pwd=body.password;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(pwd, salt, function(err, hash) {
              body.password=hash;
                var bind=[];
       for (prop in body)
        {
          bind.push(body[prop]);
        } 
        //bind=Object.values(body);
     
        let sql ='INSERT INTO users  (username,fullname,password) VALUES (?,?,?)';

        pool.query(sql,bind,function(err,result)
       {
        if (err) console.log(err);
        callback(result.insertId);
        });

        

            });
       });
        


        
    },
    login: function(username,password,callback)
    {
        this.find(username,function(user)
        {
        if(user)
        {
        
            if(bcrypt.compareSync(password,user.password))
            {
                callback(user);
                return;
            }
           
         
        }
        callback(null);
        });
    },

    addjob:function(body,callback)
    {
        var bind=[];
        for (prop in body)
         {
           bind.push(body[prop]);
         } 
         let sql ='INSERT INTO events (username,position,location,description,email,date,file,fi) VALUES (?,?,?,?,?,?,?,?)';
           
         pool.query(sql,bind,function(err,result)
       {
        if (err) console.log(err);
        callback(result);
        });

    },


    addevent:function(body,callback)
    {
        var bind=[];
        for (prop in body)
         {
           bind.push(body[prop]);
         } 
         let sql ='INSERT INTO eventss (username,eventname,location,description,contact,date,time,file,fi) VALUES (?,?,?,?,?,?,?,?,?)';
           
         pool.query(sql,bind,function(err,result)
       {
        if (err) console.log(err);
        callback(result);
        });

    },
    addinfo:function(body,callback)
    {   var binds=[];
        binds.push(body.username);
        var bind=[];
        for (prop in body)
         {
           bind.push(body[prop]);
         } 
         let sql ='INSERT INTO updaterr (username,firstname,lastname,position,company,location,email,pastjob,pastlocation,pastcompany,university,areacode,phone,file,fi) VALUES (?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)';
           
         pool.query(sql,binds,function(err,result)
       {
        if (err) console.log(err);
        
        });
        var i=0;
        var buffer=bind[0];
        for(i=0;i<bind.length-1;i++)
        {
            bind[i]=bind[i+1];
        }
        bind[i]=buffer;
        let sqll =' UPDATE updaterr  SET firstname=?,lastname=?,position=?,company=?,location=?,email=?,pastjob=?,pastlocation=?,pastcompany=?,university=?,areacode=?,phone=?,file=?,fi=? WHERE username=?';

        pool.query(sqll,bind,function(err,result)
        {
         if (err) console.log(err);
         callback(result);
         });
    },
    

    
    
    

}
alljobs=function(callback)
{
    let sql='SELECT * FROM events';
    pool.query(sql,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}
allevents=function(callback)
{
    let sql='SELECT * FROM eventss';
    pool.query(sql,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}
profile=function(name,callback)
{
    let sql='SELECT * FROM updaterr WHERE username=?';
    pool.query(sql,name,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}


  
module.exports=User;