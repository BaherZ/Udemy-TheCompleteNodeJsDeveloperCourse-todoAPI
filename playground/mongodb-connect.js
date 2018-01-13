const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
	if(err){
		return console.log(`Unable to connect to MongoDB server`)
	}
	console.log(`Connected to MongoDB server`);


	db.close();
});