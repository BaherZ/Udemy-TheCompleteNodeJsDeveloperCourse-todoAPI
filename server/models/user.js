const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
 	email: {
 		type:String,
 		trim:true,
 		required:true,
 		minlength:1,
 		unique:true,
 		validate:{
 			validator:validator.isEmail,
 			message:'{VALUE} is not a valid email'
 		}
 	},
 	password: {
 		type:String,
 		require:true,
 		minlength:6
 	},
 	tokens: [{
 		access: {
 			type:String,
 			require:true
 		},
 		token: {
			type:String,
 			require:true
 		}
 	}]
 });

UserSchema.methods.toJSON = function(){
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

	user.tokens.push({access,token})
	return user.save().then(()=>{
		return token;
	})
};

UserSchema.methods.removeToken = function(token){
	var user = this;
	return user.update({
		$pull:{
			tokens:{token}
		}
	})
}

UserSchema.statics.findByCredentials = function(email,password){
	var User = this;

	return User.findOne({email}).then((user)=>{
		if(!user){
			return Promise.reject();
		}
		return new Promise((resolve,reject)=>{
			bcrypt.compare(password,user.password,(err,res)=>{
				if(res){
					resolve(user);
				}else{
					reject();
				}
			});
		})
	})
}
//function added to the statics object turn into a model method not an instance method
UserSchema.statics.findByToken = function(token){
	//console.log(token);
	var User = this;
	//console.log(User);
	//console.log(`token is: ${token}`);
	var decoded;
	try{
		decoded = jwt.verify(token,'abc123');
	}catch(e){
		return Promise.reject();
	}
	/*}
	jwt.verify(token, 'abc123', function(err, decoded) {
	 if(err){
	     console.log(`error is ${err}`)
	 }else{
	     console.log(`decoded is ${decoded}`)
	 }
	})
	*/
	return User.findOne({
		'_id':decoded._id,
		'tokens.token':token,
		'tokens.access':'auth'
	});
};
UserSchema.pre('save',function(next){
	var user = this;
	if(user.isModified('password')){
		bcrypt.genSalt(10,(err,salt)=>{
			bcrypt.hash(user.password,salt,(err,hash)=>{
				user.password = hash;
				next();
			});
		});
	}else{
		next();
	}
});
var User = mongoose.model('User',UserSchema);

module.exports = {User}