const url = "http://172.17.4.133:8080/"
const lives = document.getElementById('matches-live');

import Match from './src/js/class/match.class.js';

fetch(url)

	.then(function(response) {

        if (response.status != 200) {
            throw new Error("API failed !");
        } else {
            return response;
        }

    })

    .catch(error => {
		throw new Error('Erreur JSON')
	})

	.then(response => {
		return response.json()
	})

	.then(response => {

		let arr = Object.keys(response).map((k) => response[k])

		return arr.map(function(elem, index) {
			elem = new Match(elem);
			elem.setNode();
			lives.appendChild(elem.node);

			setInterval(() => {
            	elem.ms += 1000;
            	elem.timer.textContent = elem.msToTime(elem.ms);
        	}, 1000);
		});
	})

	.then(matches => {

	});
	