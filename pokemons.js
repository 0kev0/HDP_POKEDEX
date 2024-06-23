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
        // const BG = document.createElement('img');

        pokemonCard.classList.add('pokemon-card');
        pokemonCard.dataset.index = index;
        pokemonCard.innerHTML = `
                    <h2>${index}. ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                `;
        // <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
        pokemonCard.addEventListener('click', () => showPokemonDetails(data));
        pokemonCard.addEventListener('click', () => showPokemonIMG(data));
        pokemonCard.addEventListener('click', () => showPokemonSTATS(data));
        pokemonCard.addEventListener('click', () => showPokemonMOVES(data));

        //Cambios importantes
        pokemonCard.addEventListener('click', () => togglePokemonSelection(data, pokemonCard));
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
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
            .then(response => response.json())
            .then(speciesData => {
                return fetchEvolutionChain(speciesData.evolution_chain.url);
            })
            .then(evolutionData => {
                const evolutions = getEvolutions(evolutionData.chain);
                /*
                    pokemonDetailsContainer.innerHTML = `
                        <h2>${pokemon.id}. ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                        <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                        <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                        <p>Weight: ${pokemon.weight}</p>
                        <p>Height: ${pokemon.height}</p>
                        <p>Stats:</p>
                        <ul>
                            ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                        </ul>
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                        <h3>Moves:</h3>
                        <ul>
                            ${pokemon.moves.slice(0, 5).map(move => `<li>${move.move.name}</li>`).join('')}
                        </ul>
                        <h3>Evolutions:</h3>
                        <ul>
                            ${evolutions.map(evo => `<li>${evo}</li>`).join('')}
                        </ul>
                    `;
                    */
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

    //Cambios nuevos e importantes
    function togglePokemonSelection(pokemon, cardElement) {
        const isSelected = selectedPokemons.find(p => p.id === pokemon.id);
        if (isSelected) {
            // Si el Pokémon ya está seleccionado, no hacemos nada (no debería ocurrir según el contexto)
            return;
        } else {
            // Reemplazar el último Pokémon seleccionado con el nuevo
            if (selectedPokemons.length > 0) {
                const lastSelectedPokemon = selectedPokemons.pop(); // Sacamos el último pokémon de la lista
                lastSelectedPokemon.cardElement.classList.remove('selected-pokemon-card'); // Quitamos la clase al último pokémon visualizado
            }
            selectedPokemons.push({
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                cardElement: cardElement // Guardamos el elemento de la carta para quitar la clase después
            });
            cardElement.classList.add('selected-pokemon-card'); // Añadimos la clase al pokémon visualizado actualmente
        }
    }
    
    function savePokemonSelection() {
        const entrenador = prompt('Ingresa el nombre del entrenador:');
        if (entrenador) {
            if (selectedPokemons.length === 0) {
                alert('Debes seleccionar al menos un Pokémon antes de guardar.');
                return;
            }
    
            const lastSelectedPokemon = selectedPokemons[selectedPokemons.length - 1]; // Obtener el último Pokémon seleccionado
    
            const trainerData = {
                nombre: entrenador,
                urlImagen: '', 
                "Lista Pokemones": [{
                    id: lastSelectedPokemon.id,
                    name: lastSelectedPokemon.name,
                    image: lastSelectedPokemon.image
                }]
            };
    
            // Almacenar localmente los datos del entrenador
            let entrenadores = JSON.parse(localStorage.getItem('entrenadores')) || [];
    
            // Buscar si el entrenador ya existe
            const existingTrainerIndex = entrenadores.findIndex(t => t.nombre === entrenador);
    
            if (existingTrainerIndex !== -1) {
                // El entrenador ya existe, agregar el último Pokémon seleccionado a su lista
                entrenadores[existingTrainerIndex]["Lista Pokemones"].push({
                    id: lastSelectedPokemon.id,
                    name: lastSelectedPokemon.name,
                    image: lastSelectedPokemon.image
                });
            } else {
                // Añadir un nuevo entrenador con el último Pokémon seleccionado
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
  
  // Define la media query
  const mediaQuery = window.matchMedia('(max-width: 600px)');
  
  // Llama a la función al cargar la página y cuando cambia la media query
  handleImgBgVisibility(mediaQuery);
  mediaQuery.addListener(handleImgBgVisibility);
  