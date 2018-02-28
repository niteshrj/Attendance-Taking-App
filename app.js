const express = require("express");
const appLib = require("./appLib/handlers.js");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");
const pg = require('pg');
let app = express();

// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test';
// const client = new pg.Client(connectionString);
// client.connect();
// let query = client.query('create table teacher(name text,class int)');
// query.on('end',()=>{
//   client.end();
// });

let logStream = fs.createWriteStream("./request.log",{flags:"a"});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req,res),
    tokens.url(req,res),
    tokens.status(req,res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.cookies)
  ].join(' ')
},{stream:logStream}));
app.use(appLib.loadUser);
app.use(express.static('public'));
app.use(appLib.redirectLoggedInUserToHome);
app.use(appLib.redirectLoggedOutUserToLogin);
app.post('/register',appLib.register);
app.post("/login",appLib.loginHandler);
app.get("/attendance",appLib.attendanceHandler);

module.exports = app;
