document.querySelector('button[data-action="scrap"]').addEventListener('click', function() {
		let xhttp;
		xhttp=new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if(this.readyState == 4 && this.status == 200) {
				//let response = JSON.parse(this.responseText);
				location.reload();
			}
		};
		xhttp.open("GET", '/zeldas/scrap' , true);
		xhttp.send();
})

document.querySelector('main').addEventListener('click', function(el) {
	if(el.target.nodeName == 'BUTTON') {
		let url = el.target.dataset.url;
		let xhttp=new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				alert(this.reponse);
			}
		};
		xhttp.open("POST", "/zelda/scrap", true);
		xhttp.setRequestHeader('Content-Type', 'application/json');
		xhttp.send(JSON.stringify({
			"url": url
		}));
	}

})
