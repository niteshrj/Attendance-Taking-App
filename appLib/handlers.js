const fs = require("fs");
const pg = require('pg');

const isValidNameAndPass = function(name,password){
	return (name!='' && password!='');
}

let lib = {
	register : function(req,res){
		let username = req.body.username;
		let password = req.body.password;
		if(isValidNameAndPass(username,password)){
			const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/attendance';
			const client = new pg.Client(connectionString);
			client.connect();
			let query = client.query(`insert into teacher values($1,$2)`,[username,password]);
			query.on('end',()=>{
				client.end();
			});
			res.redirect('/');
			return;
		}
		res.send({error: 'Invalid form submission'});
	},

	loginHandler : function(req,res){
		let validUser = registered_users.find((u)=>u.username==req.body["Name"]);
		if(!validUser){
			res.cookie("loginFailed","true");
			res.redirect("/");
			return;
		}
		let sessionid = new Date().getTime();
		res.cookie("sessionid",sessionid);
		validUser.sessionid = sessionid;
		res.redirect("/attendance");
		res.end();
	},

	attendanceHandler : function(req,res){
		res.end();
	},

	redirectLoggedInUserToHome : (req,res,next)=>{
		if(["/","/login"].includes(req.url) && req.user) res.redirect("/attendance");
		next();
	},

	redirectLoggedOutUserToLogin : (req,res,next)=>{
		if(["/","/attendance","/logout"].includes(req.url) && !req.user) res.redirect("/");
		next();
	},

	loadUser : (req,res,next)=>{
		let sessionid = req.cookies.sessionid;
		let user = registered_users.find(u=>u.sessionid==sessionid);
		if(sessionid && user){
			req.user = user;
		}
		next();
	}
};

module.exports = lib;
