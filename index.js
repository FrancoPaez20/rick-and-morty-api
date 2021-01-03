const popUp = document.getElementById('pop-up');
async function getCharactersCount() {
	const URL_BASE = 'https://rickandmortyapi.com/api/character/';
	const DATA = await (await fetch(`${URL_BASE}`)).json();
	const TOTAL = await DATA.info.count;
	return TOTAL;
}

async function getCharacter(id) {
	const URL_CHARACTER = `https://rickandmortyapi.com/api/character/${id + 1}`;
	const DATA = await (await fetch(URL_CHARACTER)).json();
	return {
		id: DATA.id,
		name: DATA.name,
		image: DATA.image,
		status: DATA.status,
		species: DATA.species,
		type: DATA.type,
		gender: DATA.gender,
		origin_name: DATA.origin.name,
		// origin_type: DATA.origin.type,
		// origin_dimenison: DATA.origin.dimension,
		episode: DATA.episode
	};
}

async function printCharacters() {
	const grid = document.getElementById('grid');
	const totalCharacters = await getCharactersCount();
	const statusHtml = {
		'Alive': '<div class="circle alive"></div>',
		'Dead': '<div class="circle dead"></div>',
		'unknown': '<div class="circle unknown"></div>'
	};

	// for (let i = 0; i < totalCharacters; i++) {
	for (let i = 0; i < 10; i++) {
		const CHARACTER = await getCharacter(i);
		grid.innerHTML += `
		<div class="grid__item" data-id="${i + 1}">
			<figure class="grid__item__image">
				<img src="${CHARACTER.image}" alt="${CHARACTER.name}">
			</figure>
			<div class="grid__item__info">
				${statusHtml[CHARACTER.status]}
				<h2>${CHARACTER.name}</h2>
			</div>
		</div>`;
	}

	let gridItem = document.querySelectorAll('.grid__item').forEach(item => {
		item.addEventListener('click', async function revealPopUp() {
			let popUpContainer = document.getElementById('pop-up-container');
			popUpContainer.style.display = "flex";
			let id = parseInt(item.getAttribute('data-id'));
			const popUp = document.getElementById('pop-up');
			const CHARACTER = await getCharacter(id - 1);

			popUp.innerHTML = `
			<img src="${CHARACTER.image}" alt="${CHARACTER.name}">
			
			<h2>${CHARACTER.name} #${CHARACTER.id}</h2>
			<p>Status: ${CHARACTER.status}</p>
			<p>Specie: ${CHARACTER.species}</p>
			<p>Gender: ${CHARACTER.gender}</p>
			<p>Origin: ${CHARACTER.origin_name}</p>
			<p>Type: ${CHARACTER.type}</p>
			<p>Appearances: ${Object.keys(CHARACTER.episode).length} episodes</p>	
			`
			// <p>${CHARACTER.origin_type}</p>
			// <p>${CHARACTER.origin_dimension}</p>
		});
	});
}

printCharacters();

const close = document.getElementById('close');

close.addEventListener('click', function closePopUp() {

	const popUpContainer = document.getElementById('pop-up-container');
	popUpContainer.style.display = "none";
})
// console.log();