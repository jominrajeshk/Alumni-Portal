const express=require('express');
const User=require('../core/user');
const router=express.Router();
const path=require('path');
const multer=require('multer');
const upload=require('express-fileupload');

const user=new User();


//serving up the index page
router.get('/',(req,res,next)=>{


    


   let user=req.session.user;
   if(user)
   {
       res.redirect('/home');
       return;
   }

    res.render('index',{title:"My application"});
});


//get home page 
router.get('/home',(req,res,next)=>{


    var data=[];
    alljobs(function(result)
    {
        console.log(result);
        if(result.length>=3)
        {
          data.push(result[result.length-1]);
          data.push(result[result.length-2]);
          data.push(result[result.length-3]);

        }
        else 
        {
            data.push(result[result.length-1]);
        }
        
        
    });

    var daata=[];
    allevents(function(result)
    {
        console.log(result);
        
        
          daata.push(result[result.length-1]);
          daata.push(result[result.length-2]);

        
        
    });

    var info=[];
    profile(req.session.user.username,function(result)
    {
        console.log(result);
        
        
          info.push(result[0]);

        
        
    });





    let user=req.session.user;
    if(user)
    {
       res.render('home',{app:req.session.app,name:user.fullname,data,daata,info});
       
        return;
    }
    res.redirect('/');
});

//register page
router.get('/register',(req,res,next)=>{

    let user=req.session.user;
    if(user)
    {
        res.redirect('/home');
        return;
    }
 
     res.render('register');
 });

//get login page
router.get('/login',(req,res,next)=>
{
    res.render('login');
}
);



// post login data
router.post('/login',(req,res,next)=>{
  user.login(req.body.username,req.body.password,function(result)
  {
      if(result)
      {
          req.session.user=result;
          req.session.app=1;
          res.redirect('/home');
      }
      else{
          res.send('Username/Password is incorrect'); 
      }
  })
});
//post register
router.post('/register',(req,res,next)=>
{

let userInput={
    username:req.body.username,
    fullname:req.body.fullname,
    password:req.body.password
};
  user.find(req.body.username,function(user)
  {
    if(user)
    {
        res.send('User already exists');
        return;
    }
  });
 user.create(userInput,function(lastId)
 {
    if(lastId) {
        // Get the user data by it's id. and store it in a session.
        user.find(lastId, function(result) {
            req.session.user = result;
            req.session.opp = 0;
            res.redirect('/login');
        });

    }else{
       console.log('Error creating a new User');
   }
     
 });
});


router.get('/logout',(req,res,next) =>
{
if(req.session.user)
{
    req.session.destroy(function()
    {
        res.redirect('/');
    });
}
});



//Taking basic registration information

router.get('/event',(req,res,next)=>{
    let user=req.session.user;
    if(user)
    {
       res.render('events',{app:req.session.app,name:user.fullname});
       
        return;
    }
    res.redirect('/');
});


router.get('/job',(req,res,next)=>{
    let user=req.session.user;
    if(user)
    {
       res.render('oppurtunitiy',{app:req.session.app,name:user.fullname});
       
        return;
    }
    res.redirect('/');
});


router.get('/info',(req,res,next)=>{
    let user=req.session.user;
    if(user)
    {
       res.render('info',{app:req.session.app,name:user.fullname});
       
        return;
    }
    res.redirect('/');
});


router.get('/alljobs',(req,res,next)=>{
    var data=[];
    alljobs(function(result)
    {
        console.log(result);
        for(var i=0;i<result.length;i++)
        {
          data.push(result[i]);
        }
        
    });
   
    let user=req.session.user;
    
    if(user)
    {
       
           
            res.render('completeevents',{app:req.session.app,data});

        
        
       
        return;
    }

    res.redirect('/');
});

router.get('/allevents',(req,res,next)=>{
    var data=[];
    allevents(function(result)
    {
        console.log(result);
        
        for(var i=0;i<result.length;i++)
        {
          data.push(result[i]);
        }
        
    });
   
    let user=req.session.user;
    
    if(user)
    {
       
           
            res.render('completejobs',{app:req.session.app,data});

        
        
       
        return;
    }

    res.redirect('/');
});

router.get('/profile',(req,res,next)=>{
    let user=req.session.user;
    if(user)
    {
       res.render('profile',{app:req.session.app,name:user.fullname});
       
        return;
    }
    res.redirect('/');
});



module.exports=router;