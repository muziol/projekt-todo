var express = require("express"),
	bodyParser = require("body-parser"),
	cors = require("cors"),
	app = express();

var model = [
	{
		id: 1,
		content: "Pan Tadeusz",
		time: "1999-02-05",
		rem: false
	},
	{
		id: 2,
		content: "Dżuma",
		time: "1999-02-05",
		rem: false
	},
	{
		id: 3,
		content: "Wesele",
		time: "1999-02-05",
		rem: false
	}
];

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get("/api/todo", function(req, res){
	res.status(200).send(model);
});

app.get("/api/todo/:id", function(req, res){
	var id = req.params.id;
	var index = model.findIndex(function(book){
		return book.id == req.params.id;
	});
	res.status(200).send(model[index]);
});

app.delete("/api/todo/:id", function(req, res){
	var id = req.params.id;
	var index = model.findIndex(function(book){
		return book.id == req.params.id;
	});
	model.splice(index, 1);
	res.status(200).send("Removed");
});

app.post("/api/todo", function(req, res){
	var data = req.body;
	data.rem = JSON.parse(data.rem); 

	model.push(data);
	
	res.status(201).send(data);
});

app.listen(3000, function(){
	console.log("serwer works");
});