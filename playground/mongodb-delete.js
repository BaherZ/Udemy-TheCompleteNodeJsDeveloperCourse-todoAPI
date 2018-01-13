const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
	if(err){
		return console.log(`Unable to connect to MongoDB server`)
	}
	console.log(`Connected to MongoDB server`);

	//DELETE MANY
	/*db.collection('Todos').deleteMany({text:"Eat lunch"}).then((result)=>{
		console.log(result);
	});*/

	//DELETE ONE
	/*db.collection('Todos').deleteOne({text:"Eat lunch"}).then((result)=>{
		console.log(result);
	});*/

	//FIND ONE AND DELETE
	/*db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
		console.log(result);
	});*/

	db.collection('Users').findOneAndDelete({_id:ObjectID("5a54f32918fdab799ddef798")})
							.then((result)=>{
								console.log(result);
							});

	db.collection('Users').deleteMany({name:"Mohamed"}).then((result)=>{
		console.log(result);
	})

	db.close();
});