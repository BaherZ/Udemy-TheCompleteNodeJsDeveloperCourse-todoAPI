var {User} = require('./../models/user');
var authenticate = (req,res,next)=>{
	var token = req.header('x-auth');
	User.findByToken(token).then((user)=>{
			
		if(!user) {
			//this will make the code go the the below catch method
			//instead of writing res.status(401).send() here aswell
			return Promise.reject(); 
		}

		req.user = user;
		req.token = token;
		next();
	}).catch((e)=>{
		res.status(401).send();
	});
};
module.exports = {authenticate};