const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// take data from the website. blob.json() sluzi da kazemo podacima da je u pitanju json data. spread (...data) sluzi da ne bismo dobili array arrayova, nego array sa podacima
fetch(endpoint)
	.then(blob => blob.json())
	.then(data => cities.push(...data));

// fn koja trazi zeljenu rec u arr cities. da bi se varijabla ubacila u regexp, mora da se napravi new RegExp().
function findMatches(wordToMatch, cities) {

	return cities.filter(place => {
		const regex = new RegExp(wordToMatch, 'gi');
		return place.city.match(regex) || place.state.match(regex)
	})
}

// fn koja ispisuje sve rezultate pretrage. koristi fn findMatches i onda te podatke ubacuje kao li elemente u suggestions ul preko var html. regex, cityName i stateName sluze samo za hajlajt.
function displayMatches() {
	const matchArray = findMatches(this.value, cities);
	const html = matchArray.map(place => {
		const regex = new RegExp(this.value, 'gi');
		const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
		const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

		return `<li>
<span class="name">${cityName}, ${stateName}</span>
<span class="population">${place.population}</span>
	</li>`;
	}).join('');
	suggestions.innerHTML = html;
}


// event listeneri za promenu polja i keyup za search. brinu se da sve bude prikazano kako se kuca.
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);