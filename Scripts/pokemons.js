document.addEventListener('DOMContentLoaded', function () {
    const pokemonListContainer = document.getElementById('pokedex_list');
    const pokemonDetailsContainer = document.getElementById('pokemon-details');
    const img_pokemon = document.getElementById('img_Pokemon');
    const list_pokemons = document.getElementById('pokemon-listaEvo');
    const estd_pokemons = document.getElementById('estd_Pokemon');
    const Mov_pokemons = document.getElementById('Mov_Pokemon');
    const saveButton = document.getElementById('save-selection');
    const maxSelection = 6; // Máximo de 6 Pokémon por entrenador
    let selectedPokemon = null;

    let db;

    // Inicia la base de datos IndexedDB
    function initDB() {
        const request = indexedDB.open('PokedexDB', 1);

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            const objectStore = db.createObjectStore('trainers', { keyPath: 'nombre' });
            objectStore.createIndex('nombre', 'nombre', { unique: true });
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            loadTrainersFromDB();
        };

        request.onerror = function(event) {
            console.error('Error opening IndexedDB:', event.target.errorCode);
        };
    }

    // Guarda los datos de los entrenadores y Pokémon seleccionados en IndexedDB
    function saveTrainerToDB(trainer) {
        const transaction = db.transaction(['trainers'], 'readwrite');
        const objectStore = transaction.objectStore('trainers');
        const request = objectStore.put(trainer);

        request.onsuccess = function() {
            Swal.fire('Exito!', 'Selección de Pokémon guardada localmente en IndexedDB', 'success');
        };

        request.onerror = function(event) {
            console.error('Error saving trainer to IndexedDB:', event.target.errorCode);
        };
    }

    // Carga los datos de los entrenadores desde IndexedDB
    function loadTrainersFromDB() {
        const transaction = db.transaction(['trainers'], 'readonly');
        const objectStore = transaction.objectStore('trainers');
        const request = objectStore.getAll();

        request.onsuccess = function(event) {
            const trainers = event.target.result;
            trainers.forEach(trainer => {
                console.log('Loaded trainer:', trainer);
                // Aquí puedes agregar lógica para mostrar los entrenadores cargados en la UI
            });
        };

        request.onerror = function(event) {
            console.error('Error loading trainers from IndexedDB:', event.target.errorCode);
        };
    }

    // Función para obtener la lista de Pokémon de la API
    function fetchPokemonList() {
        let promises = [];
        for (let i = 1; i <= 150; i++) {
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

    // Función para obtener los detalles de un Pokémon de la API
    async function fetchPokemonDetails(url, index) {
        const response = await fetch(url);
        const data = await response.json();
        const pokemonCard = document.createElement('div');

        const animatedSpriteUrl = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        const spriteUrl = animatedSpriteUrl || data.sprites.front_default;

        pokemonCard.classList.add('pokemon-card');
        pokemonCard.dataset.index = index;
        pokemonCard.innerHTML = `
            <h2>${index}. ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <img src="${spriteUrl}" alt="${data.name}">
        `;
        pokemonCard.addEventListener('click', () => showPokemonDetails(data));
        pokemonCard.addEventListener('click', () => showPokemonIMG(data));
        pokemonCard.addEventListener('click', () => showPokemonSTATS(data));
        pokemonCard.addEventListener('click', () => showPokemonMOVES(data));
        pokemonCard.addEventListener('click', () => selectPokemon(data, pokemonCard));

        return { index, element: pokemonCard };
    }

    // Función para obtener la cadena evolutiva de un Pokémon
    function fetchEvolutionChain(url) {
        return fetch(url)
            .then(response => response.json());
    }

    // Función para obtener las evoluciones de un Pokémon
    function getEvolutions(chain) {
        const evolutions = [];
        let currentChain = chain;

        do {
            evolutions.push(currentChain.species.name);
            currentChain = currentChain.evolves_to[0];
        } while (currentChain && currentChain.hasOwnProperty('evolves_to'));

        return evolutions;
    }

    // Función para mostrar los detalles de un Pokémon
    function showPokemonDetails(pokemon) {
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

    // Función para mostrar la imagen de un Pokémon
    function showPokemonIMG(pokemon) {
        img_pokemon.innerHTML = `
            <img class="img_fix" src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default || pokemon.sprites.front_default}" alt="${pokemon.name}">    
            <img class="Img_Bg" src="IMG/PokeBg_Cortada (2).png" alt="fondo">    
        `;
    }

    // Función para mostrar los movimientos de un Pokémon
    function showPokemonMOVES(pokemon) {
        Mov_pokemons.innerHTML = `
            <h3>Moves:</h3>
            <ul>
                ${pokemon.moves.slice(0, 5).map(move => `<li>${move.move.name}</li>`).join('')}
            </ul>
        `;
    }

    // Función para mostrar las estadísticas de un Pokémon
    function showPokemonSTATS(pokemon) {
        estd_pokemons.innerHTML = `
            <p>Stats:</p>
            <ul>
                ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat} <input class="rangeimput_Stat" type="range" value="${stat.base_stat}" min="0" max="200" disabled ></li>`).join('')}
            </ul>`;
    }

    // Función para mostrar las evoluciones de un Pokémon
    function showPokemons(evolutions) {
        list_pokemons.innerHTML = `
            <h3>Evolutions:</h3>
            <ul>
                ${evolutions.map(evo => `<li>${evo}</li>`).join('')}
            </ul>
        `;
    }

    // Función para seleccionar un Pokémon
    function selectPokemon(pokemon, cardElement) {
        if (selectedPokemon) {
            selectedPokemon.cardElement.classList.remove('selected-pokemon-card');
        }

        selectedPokemon = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            cardElement: cardElement
        };

        cardElement.classList.add('selected-pokemon-card');
    }

    // Función para guardar la selección de Pokémon
    function savePokemonSelection() {
        const entrenador = prompt('Ingresa el nombre del entrenador:');
        if (entrenador) {
            if (!selectedPokemon) {
                Swal.fire('Error', 'Debes seleccionar un Pokémon antes de guardar.', 'error');
                return;
            }

            // Almacenar localmente los datos del entrenador
            let entrenadores = JSON.parse(localStorage.getItem('entrenadores')) || [];

            // Buscar si el entrenador ya existe
            const existingTrainerIndex = entrenadores.findIndex(t => t.nombre === entrenador);

            if (existingTrainerIndex !== -1) {
                // Verificar si el entrenador ya tiene 6 Pokémon
                if (entrenadores[existingTrainerIndex]["Lista Pokemones"].length >= maxSelection) {
                    Swal.fire('Error', 'El entrenador ya tiene 6 Pokémon seleccionados.', 'error');

                    return;
                }
                // Agregar el Pokémon seleccionado a su lista
                entrenadores[existingTrainerIndex]["Lista Pokemones"].push({
                    id: selectedPokemon.id,
                    name: selectedPokemon.name,
                    image: selectedPokemon.image
                });
            } else {
                // Añadir un nuevo entrenador con la lista de Pokémon seleccionados
                entrenadores.push({
                    nombre: entrenador,
                    urlImagen: '/IMG/Pokeball.png', 
                    "Lista Pokemones": [{
                        id: selectedPokemon.id,
                        name: selectedPokemon.name,
                        image: selectedPokemon.image
                    }]
                });
            }

            localStorage.setItem('entrenadores', JSON.stringify(entrenadores));

            // Guardar en IndexedDB
            const trainerToSave = entrenadores.find(t => t.nombre === entrenador);
            saveTrainerToDB(trainerToSave);

            Swal.fire('Exito!', 'Selección de Pokémon guardada localmente', 'success');

        }
    }

    saveButton.addEventListener('click', savePokemonSelection);
    fetchPokemonList();
    initDB(); // Iniciar la base de datos IndexedDB
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