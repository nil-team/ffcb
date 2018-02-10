export default class Match {

	constructor(data) {

		this.date = new Date(data.begin * 1000);
		this.championship = data.championship
		this.position = {
			'name':  data.position.name,
			'lat':  data.position.lat,
			'long':  data.position.long,
		}

        this.timer = null;
        this.ms = Math.abs((new Date()).getTime() - (new Date(data.begin * 1000)).getTime());

		this.node = null;

		this.players = [
			{
				name: data.players.first.name,
				age: data.players.first.age,
				img: data.players.first.img,
				club: data.players.first.club,
			},
			{
				name: data.players.second.name,
				age: data.players.second.age,
				img: data.players.second.img,
				club: data.players.second.club,
			}
		]
	}

	redirection(url) {
        chrome.tabs.create({
            active: true,
            url: url,
            pinned: false
        });
    }

    msToTime(duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

    setNode() {
    	let li = document.createElement('li');

    	let article = document.createElement('article');
    	article.classList.add('match');

    	let h3 = document.createElement('h3');
    	h3.classList.add('match-title');
    	h3.textContent = this.championship

    	let span = document.createElement('span');
    	span.classList.add('match-timer');
    	span.setAttribute('id', 'timer');

        let today = new Date();
        span.textContent = this.msToTime(this.ms);
        this.timer = span;

    	let div1 = document.createElement('div');
    	div1.classList.add('row');
    	div1.classList.add('row-hori-between');
    	div1.classList.add('row-verti-center');
    	div1.classList.add('match-players');

    	for (var i = this.players.length - 1; i >= 0; i--) {
	    	let player = document.createElement('div');
	    	player.classList.add('col');
	    	player.classList.add('col-hori-center');
	    	player.classList.add('match-player');

	    	let img = document.createElement('img');
	    	img.src = this.players[i].img;

	    	let strong = document.createElement('strong');
	    	strong.textContent = this.players[i].name;

            if (i == 0) {
                let div = document.createElement('div');
                div.classList.add('col');
                div.classList.add('col-hori-center');

                let p = document.createElement('i');
                
                let i = document.createElement('img');
                i.src = 'src/img/vs.png';

                p.appendChild(i);

                let l = document.createElement('span');
                l.classList.add('live');

                div.appendChild(p);
                div.appendChild(l);
                div1.appendChild(div);
            }

	    	player.appendChild(img);
	    	player.appendChild(strong);
	    	div1.appendChild(player);
    	}

    	let action = document.createElement('div');
    	action.classList.add('row');
    	action.classList.add('row-hori-center');
    	action.classList.add('match-actions');

    	for (var i = 2 - 1; i >= 0; i--) {
            let div = document.createElement('div');
    		let button = document.createElement('button');
            button.classList.add('btn')
    		button.textContent = 'Regarder';

            if (i == 1) {
                button.classList.add('btn2');
                button.textContent = 'Parier';
            }
            div.appendChild(button);
    		action.appendChild(div);
    	}

    	article.appendChild(h3);
    	article.appendChild(span);
    	article.appendChild(div1);
    	article.appendChild(action);

    	li.appendChild(article);
    	this.node = li;
    }
}