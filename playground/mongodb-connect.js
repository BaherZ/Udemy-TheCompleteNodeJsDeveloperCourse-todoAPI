const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
	if(err){
		return console.log(`Unable to connect to MongoDB server`)
	}
	console.log(`Connected to MongoDB server`);

	/*db.collection('Todos').insertOne({
		text:'Something to do',
		completed:'false'
	},(err,result)=>{
		if(err){
			return console.log(`Unable to insert todo`)
		}
		console.log(JSON.stringify(result.ops,null,2));
	});*/

	//insert new doc into the users collection(name,age,location)
	/*db.collection('Users').insertOne({
		name:'Mohamed',
		age:22,
		location:'location'
	},(err,result)=>{
		if(err){
			console.log(`Unable to insert user due to ${err}`)
		}
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),null,2));
	});*/



	db.close();
});