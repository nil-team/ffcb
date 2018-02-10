const url = "http://172.17.4.133:8080/";
let matches;
let inLive = 0;
let flag = false;

fetch(url)

	.then(function(response) {

        if (response.status != 200) {
            throw new Error("API failed !");
        } else {
            return response;
        }

    })

    .catch(error => {
		throw 'Erreur JSON'
	})

	.then(response => {
		return response.json()
	})

	.then(response => {

		matches = Object.keys(response).map((k) => response[k])

		if (!flag) {
			checkLives(matches);
		}
	});

function checkLives(matches) {
	var timer = setInterval(function() {
		for (var i = matches.length - 1; i >= 0; i--) {
			let date = new Date(matches[i].begin * 1000);
			let today = new Date();

			if (date < today) {
				inLive += 1;
				flag = true;
				clearInterval(timer);
			}
		}

		if (flag) {
			chrome.notifications.create(
				'FFCB',
				{   
					type: 'basic', 
					iconUrl: 'src/icon/icon128.png', 
					title: "inLive !", 
					message: "Il y a actuellement "+inLive+" match(s) de chessboxing en cours !"
				}, function() {
					chrome.notifications.onClicked.addListener(function() {
				 		window.open("popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
				}) 
			}); 
		}

		
	}, 1000);	
}


