const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
	if(err){
		return console.log(`Unable to connect to MongoDB server`)
	}
	console.log(`Connected to MongoDB server`);

	db.collection('Todos')
	.findOneAndUpdate({_id:ObjectID("5a54f25bbfa2607956eb3ae6")},
	{$set:{completed:true}},
	{
		returnOriginal:false //to get the updated document back as a result 
	})
	.then((result)=>{
		console.log(result);
	})

	db.close();
});