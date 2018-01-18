const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*Todo.remove({}).then((result)=>{
	console.log(result);
})*/

Todo.findByIdAndRemove("5a60240bef5f047b7efba8b4").then((todo)=>{
	console.log(todo);
});

/*Todo.findOneAndRemove({_id:"5a60240bef5f047b7efba8b4"}).then((todo)=>{
	
})*/