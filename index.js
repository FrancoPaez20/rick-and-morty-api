let grid = document.getElementById('grid');
let popUp = document.getElementById('pop-up');

async function getAllCharacters() {

	const URL_BASE = 'https://rickandmortyapi.com/api/character/';
	const DATA = await (await fetch(`${URL_BASE}`)).json();
	const TOTAL = await DATA.info.count;
	return TOTAL;
}

async function getCharacter(id) {

	let real_id = id + 1;
	const URL_CHARACTER = `https://rickandmortyapi.com/api/character/${real_id}`;
	const DATA = await (await fetch(URL_CHARACTER)).json();
	return {
		name: DATA.name,
		image: DATA.image,
		status: DATA.status,
		species: DATA.species,
		type: DATA.type,
		gender: DATA.gender,
		origin_name: DATA.origin.name,
		origin_type: DATA.origin.type,
		origin_dimenison: DATA.origin.dimension,
		episode: DATA.episode
	};
}

async function printCharacters() {

	const totalCharacters = await getAllCharacters();
	const statusHtml = {
		'Alive': '<div class="circle alive"></div>',
		'Dead': '<div class="circle dead"></div>',
		'unknown': '<div class="circle unknown"></div>'
	};

	// for (let i = 0; i < totalCharacters; i++) {
	for (let i = 0; i < 10; i++) {

		const CHARACTER = await getCharacter(i);

		grid.innerHTML += `
		<a href="#" class="grid__item">
		<figure class="grid__item__image">
		<img src="${CHARACTER.image}" alt="${CHARACTER.name}">
		</figure>
		<div class="grid__item__info">
		${statusHtml[CHARACTER.status]}
		<h2>${CHARACTER.name}</h2>
		</div>
		</a>`;
	}

	let gridItem = document.querySelectorAll('.grid__item').forEach(item => {

		item.addEventListener('click', function revealPopUp() {

			let popUp = document.getElementById('pop-up-container');
			popUp.style.display = "block";
		});
	});
}

printCharacters();

let close = document.getElementById('close');

close.addEventListener('click', function closePopUp() {

	let popUp = document.getElementById('pop-up-container');
	popUp.style.display = "none";
})
// console.log(Object.keys(CHARACTER.episode).length);