const express = require('express');
const appLib = require('./appLib/handlers.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(appLib.logRequest);
app.use(appLib.loadUser);
app.use(appLib.redirectLoggedInUserToHome);
app.use(appLib.redirectLoggedOutUserToLogin);

app.get('/login',appLib.serveLoginPage);
app.post('/login',appLib.loginHandler);
app.get('/attendance',appLib.attendanceHandler);

module.exports = app;
