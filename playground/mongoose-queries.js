const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


/*User.findById(id).then((user)=>{
	if(!user){
		return console.log("No user by this id found")
	}
	console.log(JSON.stringify(user,null,2));
}, (e)=>{
	console.log(e);
})*/
var checkID = {
	validateId : (id)=>{
		if(!ObjectID.isValid(id)) 
			return false;
	},
	checkIdInDB:(id)=>{
		User.findById(id).then((user)=>{
			if(!user)
				return false;
			return user;
		}, (e)=>{
			return false;
		})
	}
}
module.exports = checkID;
/*if(!ObjectID.isValid(id)) {
	console.log(`ID not valid`);
}*/
/*Todo.find({
	_id:id
}).then((todos)=>{
	console.log("Todos",todos);
});

Todo.findOne({
	_id:id
}).then((todo)=>{
	console.log("Todo",todo);
});*/

/*Todo.findById(id).then((todo)=>{
	if(!todo){
		return console.log("Id not found");
	}
	console.log(`Todo by id ${todo}`);
}).catch((e)=>{console.log(e)});*/
