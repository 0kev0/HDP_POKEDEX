let entrenadores = ["Lino", "Kevin", "Chepe", "Angel", "Navbar"];
let selectedPokemons = [];

function openPopup() {
    document.getElementById("popup").style.display = "block";
    loadTrainers(); // Cargar la lista de entrenadores en el select
    fetchPokemons(); // Cargar la lista de Pokémon disponibles
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function loadTrainers() {
    const trainerSelect = document.getElementById("trainer-select");
    trainerSelect.innerHTML = '<option value="" disabled selected>Selecciona un entrenador</option>';
    entrenadores.forEach(trainer => {
        const option = document.createElement("option");
        option.value = trainer;
        option.textContent = trainer;
        trainerSelect.appendChild(option);
    });
}

async function fetchPokemons() {
    const pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = "Cargando Pokémon...";
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();
        displayPokemons(data.results);
    } catch (error) {
        pokemonList.innerHTML = "Error al cargar Pokémon";
    }
}

function displayPokemons(pokemons) {
    const pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = "";
    pokemons.forEach(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const pokemonData = await response.json();
        const pokemonItem = document.createElement("div");
        pokemonItem.innerHTML = `
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <span>${pokemonData.name}</span>
            <button onclick="selectPokemon(${pokemonData.id}, '${pokemonData.name}', '${pokemonData.sprites.front_default}')">Seleccionar</button>
        `;
        pokemonList.appendChild(pokemonItem);
    });
}

function selectPokemon(id, name, image) {
    if (!selectedPokemons.some(pokemon => pokemon.id === id)) {
        selectedPokemons.push({ id, name, sprites: { front_default: image } });
        alert(`${name} seleccionado`);
    } else {
        alert(`${name} ya está seleccionado`);
    }
}

function savePokemonSelection() {
    const trainerSelect = document.getElementById("trainer-select");
    const entrenador = trainerSelect.value;

    if (entrenador && selectedPokemons.length > 0) {
        const trainerData = {
            nombre: entrenador,
            urlImagen: '',
            "Lista Pokemones": selectedPokemons.map(pokemon => ({
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.front_default
            }))
        };

        // Almacenar localmente los datos del entrenador
        let storedTrainers = JSON.parse(localStorage.getItem('entrenadores')) || [];

        // Buscar si el entrenador ya existe
        const existingTrainerIndex = storedTrainers.findIndex(t => t.nombre === entrenador);

        if (existingTrainerIndex !== -1) {
            // Actualizar el entrenador existente
            storedTrainers[existingTrainerIndex]["Lista Pokemones"] = trainerData["Lista Pokemones"];
        } else {
            // Añadir un nuevo entrenador
            storedTrainers.push(trainerData);
        }

        localStorage.setItem('entrenadores', JSON.stringify(storedTrainers));

        alert('Selección de Pokémon guardada localmente');
        closePopup();
        displayTrainersAndPokemons(); // Actualizar la visualización de entrenadores y Pokémon
    } else {
        alert('Por favor, asegúrate de seleccionar al menos un Pokémon y un entrenador.');
    }
}

function displayTrainersAndPokemons() {
    const trainersPokemonList = document.getElementById("trainers-pokemon-list");
    trainersPokemonList.innerHTML = "";
    const storedTrainers = JSON.parse(localStorage.getItem('entrenadores')) || [];

    storedTrainers.forEach(trainer => {
        const trainerCard = document.createElement("div");
        trainerCard.classList.add("trainer-card");
        trainerCard.innerHTML = `
            <h2>${trainer.nombre}</h2>
            <div class="pokemon-list">
                ${trainer["Lista Pokemones"].map(pokemon => `
                    <div>
                        <img src="${pokemon.image}" alt="${pokemon.name}">
                        <h4>${pokemon.name}</h4>
                    </div>
                `).join('')}
            </div>
        `;
        trainersPokemonList.appendChild(trainerCard);
    });
}

document.getElementById("clearButton").addEventListener("click", () => {
    localStorage.removeItem('entrenadores');
    displayTrainersAndPokemons();
});

window.onload = displayTrainersAndPokemons;
