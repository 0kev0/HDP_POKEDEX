document.addEventListener('DOMContentLoaded', function () {
    const pokemonListContainer = document.getElementById('pokedex_list');
    const pokemonDetailsContainer = document.getElementById('pokemon-details');
    const img_pokemon = document.getElementById('img_Pokemon');
    const list_pokemons = document.getElementById('pokemon-listaEvo');
    const estd_pokemons = document.getElementById('estd_Pokemon');
    const Mov_pokemons = document.getElementById('Mov_Pokemon');
    const saveButton = document.getElementById('save-selection');
    const maxSelection = 6;
    let selectedPokemons = [];
    let currentPokemon = null;  // Variable para almacenar el Pokémon actualmente visto

    function fetchPokemonList() {
        let promises = [];
        for (let i = 1; i <= 151; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetchPokemonDetails(url, i));
        }

        Promise.all(promises)
            .then(results => {
                results.sort((a, b) => a.index - b.index);

                results.forEach(pokemonCard => {
                    pokemonListContainer.appendChild(pokemonCard.element);
                });
            })
            .catch(error => {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = `Error: ${error.message}`;
                pokemonListContainer.appendChild(errorMessage);
            });
    }

    async function fetchPokemonDetails(url, index) {
        const response = await fetch(url);
        const data = await response.json();
        const pokemonCard = document.createElement('div');

        pokemonCard.classList.add('pokemon-card');
        pokemonCard.dataset.index = index;
        pokemonCard.innerHTML = `
                    <h2>${index}. ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                `;
        pokemonCard.addEventListener('click', () => showPokemonDetails(data));
        pokemonCard.addEventListener('click', () => showPokemonIMG(data));
        pokemonCard.addEventListener('click', () => showPokemonSTATS(data));
        pokemonCard.addEventListener('click', () => showPokemonMOVES(data));
        return { index, element: pokemonCard };
    }

    function fetchEvolutionChain(url) {
        return fetch(url)
            .then(response => response.json());
    }

    function getEvolutions(chain) {
        const evolutions = [];
        let currentChain = chain;

        do {
            evolutions.push(currentChain.species.name);
            currentChain = currentChain.evolves_to[0];
        } while (currentChain && currentChain.hasOwnProperty('evolves_to'));

        return evolutions;
    }

    function showPokemonDetails(pokemon) {
        currentPokemon = pokemon;  

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
            .then(response => response.json())
            .then(speciesData => {
                return fetchEvolutionChain(speciesData.evolution_chain.url);
            })
            .then(evolutionData => {
                const evolutions = getEvolutions(evolutionData.chain);
                showPokemons(evolutions);
            });
    }

    function showPokemonIMG(pokemon) {
        img_pokemon.innerHTML = `
            <img class="img_fix" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">    
            <img class="Img_Bg" src="IMG/PokeBg_Cortada (2).png" alt="fondo">    
        `;
    }

    function showPokemonMOVES(pokemon) {
        Mov_pokemons.innerHTML = `
            <h3>Moves:</h3>
            <ul>
                ${pokemon.moves.slice(0, 5).map(move => `<li>${move.move.name}</li>`).join('')}
            </ul>
        `;
    }

    function showPokemonSTATS(pokemon) {
        estd_pokemons.innerHTML = `
            <p>Stats:</p>
            <ul>
                ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat} <input class="rangeimput_Stat" type="range" value="${stat.base_stat}" min="0" max="200" disabled ></li>`).join('')}
            </ul>`;
    }
    
    function showPokemons(evolutions) {
        list_pokemons.innerHTML = `
            <h3>Evolutions:</h3>
            <ul>
                ${evolutions.map(evo => `<li>${evo}</li>`).join('')}
            </ul>
        `;
    }

    function savePokemonSelection() {
        // Incluir el Pokémon actualmente visto en la lista de seleccionados si no está ya en la lista
        if (currentPokemon && !selectedPokemons.find(p => p.id === currentPokemon.id)) {
            selectedPokemons.push(currentPokemon);
        }

        if (selectedPokemons.length > maxSelection) {
            alert('Solo puedes seleccionar hasta 6 Pokémon');
            return;
        }

        const entrenador = prompt('Ingresa el nombre del entrenador:');
        if (entrenador) {
            const trainerData = {
                nombre: entrenador,
                urlImagen: '', 
                "Lista Pokemones": selectedPokemons.map(pokemon => ({
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.front_default
                }))
            };

            let entrenadores = JSON.parse(localStorage.getItem('entrenadores')) || [];
            
            const existingTrainerIndex = entrenadores.findIndex(t => t.nombre === entrenador);
            
            if (existingTrainerIndex !== -1) {
                entrenadores[existingTrainerIndex]["Lista Pokemones"] = trainerData["Lista Pokemones"];
            } else {
                entrenadores.push(trainerData);
            }

            localStorage.setItem('entrenadores', JSON.stringify(entrenadores));

            alert('Selección de Pokémon guardada localmente');
        }
    }

    saveButton.addEventListener('click', savePokemonSelection);
    fetchPokemonList();
});

function handleImgBgVisibility(mediaQuery) {
    const imgBgElements = document.querySelectorAll('.Img_Bg');
  
    if (mediaQuery.matches) {
      imgBgElements.forEach(el => {
        el.style.display = 'none';
      });
    } else {
      imgBgElements.forEach(el => {
        el.style.display = '';
      });
    }
}

const mediaQuery = window.matchMedia('(max-width: 600px)');

handleImgBgVisibility(mediaQuery);
mediaQuery.addListener(handleImgBgVisibility);
