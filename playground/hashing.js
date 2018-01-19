const {SHA256} = require('crypto-js');//Number of bits that are the resulting hash
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

/*bcrypt.genSalt(10,(err,salt)=>{
	bcrypt.hash(password,salt,(err,hash)=>{
		console.log(hash);
	})
});*/

var hashedPassword = "$2a$10$nL.zTGlRlUUlWnl9iiftme8ERqx7qH.Sm090vsdE5RfhaLaSUUBWe";
bcrypt.compare(password,hashedPassword,(err,res)=>{
	console.log(res);
});
/*var data = {
	id:10
};
//this is the data that we are going to send back to the user when they 
//signup or login
var token = jwt.sign(data,'123abc');
console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log(decoded);


var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message is: ${message}`);
console.log(`Hash is: ${hash}`);

var data = {
	id:4
};
var token = {
	data,
	hash: SHA256(JSON.stringify(data) + "somesecret").toString()
}
token
var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();

if(resultHash === token.hash){
	console.log("Data was not changed ")
}else{
	console.log("Do not trust")
}*/