const express =require('express');
const nodemon=require('nodemon');
const path =require('path');
const app=express();
const ejs=require('ejs');
const pageRouter=require('./routes/pages');
const session=require('express-session');
const multer=require('multer');
const User=require('./core/user');
const hbs=require('hbs');
const user=new User();
const Handlebars = require("handlebars");


app.use(express.urlencoded({extended:false}));


//serve static files
const staticpath=path.join(__dirname,'./public');
app.use(express.static(staticpath));
//app.use('/public', express.static(staticpath));

//template engine
const partialsPath=path.join(__dirname,'./templates/partials')
app.set('views',path.join(__dirname,'./templates/views'));
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);
app.use(session(
    {
        secret:'youtube_video',
        resave:false,
        saveUninitialized:false,
        cookie:
        {
            maxAge:60*1000*30
        }
    }
));



var fs = require('fs');
var busboy = require('connect-busboy');
//...
app.use(busboy()); 
//...
var buff;
app.post('/event', function(req, res) {

   


    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/public/img/' + filename);
        buff=filename;
        file.pipe(fstream);
        fstream.on('close', function () {
            
        });
    });
});

app.post('/evente',function(req,res)
{
    let event={
        username:req.session.user.username,
        eventname:req.body.eventname,
        eventlocation:req.body.location,
        eventdescription:req.body.description,
        contactname:req.body.contact,
        eventdate:req.body.date,
        eventtime:req.body.time,
        namefile:__dirname + '/public/img/' + buff,
        fi:buff
    };
    user.addevent(event,function(result)
            {
                if(result)
                {
                    res.redirect('home');
                }
            });
});








var name;
app.post('/job', function(req, res) {

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/public/img/' + filename);
        name=filename;
        file.pipe(fstream);
        fstream.on('close', function () {

           
        });
    });
});

app.post('/jobb',function(req,res)
{
    let jobinput={
        username:req.session.user.username,
        jobposition:req.body.position,
        joblocation:req.body.joblocation,
        jobdescription:req.body.jobdescription,
        contactname:req.body.contactadd,
        applydate:req.body.date,
        namefile:__dirname + '/public/img/' + name,
        fi:name
    };
    user.addjob(jobinput,function(result)
            {
                if(result)
                {
                    res.redirect('home');
                }
            });
});

var hello;
app.post('/pic', function(req, res) {

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/public/img/' + filename);
        hello=filename;
        file.pipe(fstream);
        fstream.on('close', function () {

           
        });
    });
});
app.post('/info',function(req,res)
{
    let profileinput={
        username:req.session.user.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        position:req.body.position,
        company:req.body.company,
        reside:req.body.residence,
        pastjob:req.body.pastexperience,
        pastlocation:req.body.pastlocation,
        pastcompany:req.body.pastcompany,
        university:req.body.university,
        email:req.body.email,
       area:req.body.areacode,
       phone:req.body.phone,
        namefile:__dirname + '/public/img/' + hello,
        fi:hello
    };
    user.addinfo(profileinput,function(result)
            {
                if(result)
                {
                    res.redirect('home');
                }
            });
});



















//routers
app.use('/',pageRouter);




//errors
app.use((req,res,next)=>
{
    if(err)
    {
        console.log(err);
    }
    err.status=404;
    next(err);
}); 

//handling errors
/*app.use((err,res,req,next)=>{
res.status(err.status||500);
res.send(err.message);
});*/

// setting up the server
app.listen(3000,()=>
{
    console.log('server is running on port 3000');
});

module.exports=app;
