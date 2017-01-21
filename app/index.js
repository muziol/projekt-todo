var qwest = require("qwest");
var tablica = [];

getTasks();

function getTasks(){
	qwest.get('http://localhost:3000/api/todo').then(function(xhr, response) {
		tablica = response;
		render();
		console.log(tablica);
	});
};

function getTask(id){
	qwest.get("http://localhost:3000/api/todo/" + id).then(function(xhr, response){
		console.log(response);
	})
	.catch(function(e, xhr, response) {
		console.log(e);
	});
};

function deleteTask(){
	
	for (i = 0; i < tablica.length; i++  ){

		if (tablica[i].rem == true){

			var newUrl = 'http://localhost:3000/api/todo/' + tablica[i].id;

			qwest.delete(newUrl, null, {
				cache: true
			})
			.then(function(xhr, response){
				getTasks();
			})
			.catch(function(e, xhr, response){
				alert("delete errod: " + e);
			});

		};
	};
};

function addTask(){
	newUrl = 'http://localhost:3000/api/todo';
	var gettextarea = document.getElementById("content_todo");
	var getdate = document.getElementById("data_todo");
	var x = {
		id: tablica.length +1,
		content: '',
		time: '',
		rem: false
	}
	console.log(getdate.value);
	console.log(gettextarea.value);
	console.log(x.content);
	console.log(x.time);
	x.content = gettextarea.value;
	x.time = getdate.value;
	

	if (x.content == '' || x.time  == ''){
		alert("Dodaj treść lub/i datę");
	}
	else {
		qwest.post(newUrl, x, {
			cache: true
		})
		.then(function(xhr, response){
			getTasks();
		})
		.catch(function(e, xhr, response){
			alert("post error: " + e);
		});
	}	
	getTasks();
	console.table(tablica);
}



function sort() {
	tablica.sort(function(x,y){
		if (x.time > y.time)
			return 1;
		return -1;
	});
}

function render() {
	var dodaj = document.getElementById("lista_todo");


	while ( dodaj.firstChild ){
	 	 dodaj.removeChild( dodaj.firstChild );
	}

	sort(); 

	var today = new Date(),
		dd = today.getDate(),
		mm = today.getMonth()+1, //January is 0
		yyyy = today.getFullYear();

	if(dd<10) {
    	dd='0'+dd
	} 

	if(mm<10) {
    	mm='0'+mm
	} 

	today = yyyy + '-' + mm + '-' + dd; // current date

	//console.log( today );
	console.log(tablica.length);
	var i;
	for (i = 0; i < tablica.length; i++  ) {
		if (tablica[i].rem == false){
			var li = document.createElement("li"),
				checkbox1 = document.createElement("input"),
				span = document.createElement("span");
			checkbox1.type = "checkbox";
			checkbox1.id = i;
			checkbox1.addEventListener("click", change);
			dodaj.appendChild(li);
			li.appendChild(checkbox1);
			li.appendChild(span);
			//console.log(tablica[i].time);
			//console.log(today);
			//console.log(tablica[i].time == today);
			//console.log(tablica[i].time > today);
			//console.log(tablica[i].time < today);

			// today
			if (tablica[i].time == today) {
				li.style.background = "green";
			}
			// past days
			else if (tablica[i].time > today){
				li.style.background = "yellow";
			}
			// future days
			else if (tablica[i].time < today){
				li.style.background = "red";
			}

			span.innerHTML = tablica[i].content + ". Do kiedy: " + tablica[i].time;
			console.log("dodalem" + tablica[i].id + tablica[i].content + tablica[i].time + tablica[i].rem);
		}
	}
}



function addEl() {
	addTask();
}

function change() {
	tablica[this.id].rem = !tablica[this.id].rem
}

function remEl() {
	deleteTask();
}


var buttonAdd = document.getElementById("ADDKURWA");
buttonAdd.addEventListener( "click", addEl );

var buttonAdd = document.getElementById("REMKURWA");
buttonAdd.addEventListener( "click", remEl );


