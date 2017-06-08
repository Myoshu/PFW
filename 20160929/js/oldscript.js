var fields = document.getElementsByClassName("board");
fields = Array.prototype.slice.call(fields, 0);

var iks = true;
var oks = false;

/*var win = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[1,4,7],
	[2,5,8],
	[3,6,9],
	[1,5,9],
	[3,5,7]
];*/

var win = [
	{"niz":[1,2,3], "counter":0},
	{"niz":[4,5,6], "counter":0},
	{"niz":[7,8,9], "counter":0},
	{"niz":[1,4,7], "counter":0},
	{"niz":[2,5,8], "counter":0},
	{"niz":[3,6,9], "counter":0},
	{"niz":[1,5,9], "counter":0},
	{"niz":[3,5,7], "counter":0}
];

var xPlayed = [];
var oPlayed = [];
var xwon = 0;
var owon = 0;

fields.forEach(function(field) {
	field.addEventListener("click", function() {
		if(iks && this.dataset.value=="") {
			this.src = "images/x.png";
			this.dataset.value = "x";

			iks = false;
			oks = true;

			xPlayed.push(this.id);
		} else if (oks && this.dataset.value=="") {
			this.src = "images/o.png";
			this.dataset.value = "o";

			oks = false;
			iks = true;

			oPlayed.push(this.id);
		}

		/*win.forEach(function(niz) {
			//console.log(niz.toString());
			//console.log(xPlayed.sort().toString());
			console.log(xPlayed.sort().includes(niz));
			//console.log(niz.toString().indexOf(xPlayed));
			if(xPlayed.sort().includes(niz)) {
				xwon = true;
				console.log("AAAAAA");
			} else if (oPlayed.sort().toString() === niz.toString()) {
				owon = true;
			}
		});*/
		win.forEach(function(object) {
			//console.log(object.niz);
			//console.log(xPlayed[xPlayed.length-1]);
			/*console.log(object.niz.toString().includes(xPlayed[xPlayed.length-1]));
			if(object.niz.toString().includes(xPlayed[xPlayed.length-1])) {
				object.counter++;
			}
			if(object.counter == 3) {
				console.log("VICTORY");
			}
			console.log(object.counter);*/
			/*if((niz.toString()).includes(xPlayed[xPlayed.length-1])) {
				//console.log(xPlayed[xPlayed.length-1]);
				xwon++;
				//console.log(xwon);
				if(xwon == 3) {
					console.log("pobedio je");
				} else {
					xwon = 0;
				}
			}*/

			if(xPlayed.length > 2) {
				for(i=0; i<xPlayed.length; i++) {
					if(object.niz.toString().includes(xPlayed[i])) {
						object.counter++;
					}
				}

				if(object.counter == 3) {
					console.log("VICTORY X");
				}
			}
			if(oPlayed.length > 2) {
				for(i=0; i<oPlayed.length; i++) {
					if(object.niz.toString().includes(oPlayed[i])) {
						object.counter++;
					}
				}

				if(object.counter == 3) {
					console.log("VICTORY O");
				}
			}
		});

		/*win.forEach(function(niz) {
			if(xPlayed.length > 2) {
				for(i=0; i<xPlayed.length; i++) {
					if(xPlayed.sort().toString().)
				}
			}
		})*/

		setTimeout(function() {
			if(xwon) {
				alert("X je pobedio.");
			} else if (owon) {
				alert("O je pobedio.");
			}
		}, 500);
	});
});