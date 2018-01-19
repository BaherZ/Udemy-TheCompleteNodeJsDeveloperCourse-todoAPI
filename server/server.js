require('./config/config.js');

const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET REQUESTS

//This route will require authentication which mean it's going to
//expect a valid x-auth token
app.get('/users/me',authenticate,(req,res)=>{
	res.send(req.user)
});

app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({todos});
	},(e)=>{
		res.status(400).send(e)
	})
})
app.get('/todos/:id',(req,res)=>{
	var id = req.params.id;
	//validate id using isValid in mongoose-queries file
		//if it's not valid, respond with a 404,send back an empty body likethis .send()
	if(!ObjectID.isValid(id)){
		return res.status(404).send()
	}
	//query the database looking for a matching document
		//success
			//If there is a todo, send it back
	Todo.findById(id).then((todo)=>{
		if(!todo){
			return res.status(404).send();
		}
		return res.status(200).send({todo});
	}).catch((e)=>{
		return res.status(400).send()
	});
			//If no todo-send back 404 with an empty body
		//error
			//Respond with a 400, send empty body back

},(e)=>{
	res.status(400).send(e);
})

//POST REQUESTS

//POST/USERS
app.post('/users',(req,res)=>{
	var body = _.pick(req.body,['email','password']);
	var user = new User(body);

	user.save().then(()=>{
		return user.generateAuthToken();
	}).then((token)=>{
		//when you prefix a header with "x-",you're creating a custom header,
		//that means that it's a header that is not necessarly supported by
		//http by defauly, it's a header you use for your specific purpose
		res.header('x-auth',token).send(user);
	}).catch((e)=>{
		res.status(400).send(e)
	})
});

app.post('/users/login',(req,res)=>{
	var body = _.pick(req.body,['email','password']);

	User.findByCredentials(body.email,body.password)
		.then((user)=>{
			user.generateAuthToken().then((token)=>{
				res.header('x-auth',token).send(user);
			})
		}).catch((e)=>{
			res.status(400).send();
		});
});

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

//DELETE REQUESTS

app.delete('/todos/:id',(req,res)=>{
	//get the id
	var id = req.params.id;
	//validate the id->notvalid? return 404
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	//remove the todo by id
		//success
			//if no doc,send 404
			//if doc, send it back with status 200

		//error
			//400 with empty body
	Todo.findByIdAndRemove(id).then((result)=>{
			if(!result){
				res.status(404).send();
			}
			res.send(result);
		}).catch((e)=>{
			res.status(400).send();
		})
})

//PATCH REQUESTS

app.patch('/todos/:id',(req,res)=>{
	var id = req.params.id;
	var body = _.pick(req.body, ['text','completed']);
	
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id,{$set:body},{new:true})
		.then((todo)=>{	
			if(!todo){
				return res.status(404).send();
			}
			res.send({todo});
		}).catch((e)=>{
			res.status(400).send()
		})
})

app.listen(port);

module.exports = {app};



