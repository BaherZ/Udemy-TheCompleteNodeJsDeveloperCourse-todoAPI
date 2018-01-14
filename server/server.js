var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
	var todo = new Todo({
		text:req.body.text
	})
	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({todos});
	},(e)=>{
		res.status(400).send(e)
	})
})

/*app.post('/todos',(req,res)=>{
	var todo = new Todo({
		text:"Test todo text"
	});

	todo.save().then((doc)=>{
		res.send(doc);
	}, (e)=>{
		res.status(400).send(e);
	 });
}); */

app.listen(3004, ()=>{
	console.log(`Running on port 3004`)
});

module.exports = {app};



