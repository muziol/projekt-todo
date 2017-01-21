var tablica = []

function sort() {
	tablica.sort(function(x,y){
		if (x.time > y.time)
			return 1;
		return -1;
	});
}

function usun() {
	for (i = 0; i < tablica.length; i++  ) {
		if (tablica[i].rem == true){
			tablica.splice(i, 1);
			//console.log (tablica[i]);
			//console.log ("usuwam");
		}
	}
	render();
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
			console.log(tablica[i].time);
			console.log(today);
			console.log(tablica[i].time == today);
			console.log(tablica[i].time > today);
			console.log(tablica[i].time < today);

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
		}
	}
}



function addEl() {
	var gettextarea = document.getElementById("content_todo");
	var getdate = document.getElementById("data_todo");
	var x = {
		content: '',
		time: '',
		rem: false
	}
	x.content = gettextarea.value;
	x.time = getdate.value;
	

	if (x.content == '' || x.time  == ''){
		alert("Dodaj treść lub/i datę");
	}
	else {
		tablica.push(x);
		//console.log(x)

	}	
	render();
}

function change() {
	tablica[this.id].rem = !tablica[this.id].rem
}

function remEl() {
	usun();
}


var buttonAdd = document.getElementById("ADDKURWA");
buttonAdd.addEventListener( "click", addEl );

var buttonAdd = document.getElementById("REMKURWA");
buttonAdd.addEventListener( "click", remEl );


