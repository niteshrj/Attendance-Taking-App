const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;

const registered_users = [{username:'a'}];

let toS = o=>JSON.stringify(o,null,2);

let lib = {
  loginHandler : function(req,res){
    let validUser = registered_users.find((u)=>u.username==req.body['Name']);
    if(!validUser){
      res.cookie('loginFailed','true');
      res.redirect('/');
      return;
    }
    let sessionid = new Date().getTime();
    res.cookie('sessionid',sessionid);
    validUser.sessionid = sessionid;
    res.redirect('/attendance');
    res.end();
  },
  serveLoginPage : function(req,res){
    let loginPage = fs.readFileSync('./src/index.html','utf8');
    res.send(loginPage);
  },
  attendanceHandler : function(req,res){
    res.end();
  },
  redirectLoggedInUserToHome : (req,res,next)=>{
    if(['/','/login'].includes(req.url) && req.user) res.redirect('/attendance');
    next();
  },
  redirectLoggedOutUserToLogin : (req,res,next)=>{
    if(['/','/attendance','/logout'].includes(req.url) && !req.user) res.redirect('/login');
    next();
  },
  loadUser : (req,res,next)=>{
    let sessionid = req.cookies.sessionid;
    let user = registered_users.find(u=>u.sessionid==sessionid);
    if(sessionid && user){
      req.user = user;
    }
    next();
  },
  logRequest : (req,res,next)=>{
    let text = ['------------------------------',
      `${timeStamp()}`,
      `${req.method} ${req.url}`,
      `HEADERS=> ${toS(req.headers)}`,
      `COOKIES=> ${toS(req.cookies)}`,
      `BODY=> ${toS(req.body)}`,''].join('\n');
    fs.appendFile('request.log',text,()=>{});

    console.log(`${req.method} ${req.url}`);
    next();
  }
}

module.exports = lib;
