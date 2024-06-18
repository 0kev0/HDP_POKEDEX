let listaDePokemon = []; // Array para almacenar los Pokémon obtenidos

// Función para obtener la lista de Pokémon
async function fetchPokemonList() {
    let promises = [];
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetchPokemonDetails(url, i));
    }

    const results = await Promise.all(promises);
    listaDePokemon = results.map(pokemon => ({
        nombre: pokemon.name,
        imagen: pokemon.sprites.front_default
    }));

    return listaDePokemon; // Devuelve la lista de Pokémon
}

// Función para obtener los detalles del Pokémon
async function fetchPokemonDetails(url, index) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Función para obtener un Pokémon aleatorio
function obtenerPokemonAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * listaDePokemon.length);
    return listaDePokemon[indiceAleatorio];
}

// Función para generar opciones de respuesta
function generarOpciones(pokemonCorrecto) {
    const opciones = [pokemonCorrecto];

    while (opciones.length < 3) {
        const opcionAleatoria = obtenerPokemonAleatorio();
        if (!opciones.some(pokemon => pokemon.nombre === opcionAleatoria.nombre)) {
            opciones.push(opcionAleatoria);
        }
    }

    // Mezcla las opciones
    for (let i = opciones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
    }

    return opciones;
}

// Función para mostrar la sombra del Pokémon
function mostrarPokemonSombra(pokemon) {
    const imagenPokemonSombra = document.getElementById('pokemon-sombra');
    imagenPokemonSombra.src = pokemon.imagen;
    imagenPokemonSombra.classList.add('pokemon-sombra');
    imagenPokemonSombra.classList.remove('pokemon-color');
}

// Función para mostrar las opciones de respuesta
function mostrarOpciones(opciones, pokemonCorrecto) {
    const divOpciones = document.getElementById('opciones');
    divOpciones.innerHTML = '';

    opciones.forEach(opcion => {
        const boton = document.createElement('button');
        boton.innerText = opcion.nombre;
        boton.className = 'boton-opcion';
        boton.addEventListener('click', () => verificarRespuesta(opcion, pokemonCorrecto));
        divOpciones.appendChild(boton);
    });
}

// Función para verificar la respuesta
function verificarRespuesta(pokemonSeleccionado, pokemonCorrecto) {
    if (pokemonSeleccionado.nombre === pokemonCorrecto.nombre) {
        alert('¡Correcto!');
        revelarPokemon(pokemonCorrecto);
        setTimeout(iniciarJuego, 3000);
    } else {
        alert('Incorrecto, prueba de nuevo.');
        setTimeout(iniciarJuego, 1000);
    }
     
}

// Función para revelar el Pokémon
function revelarPokemon(pokemon) {
    const imagenPokemonSombra = document.getElementById('pokemon-sombra');
    imagenPokemonSombra.classList.remove('pokemon-sombra');
    imagenPokemonSombra.classList.add('pokemon-color', 'move-forward');
    setTimeout(() => {
        imagenPokemonSombra.classList.remove('pokemon-color', 'move-forward'); 
    }, 3000);
}

// Función para iniciar el juego
async function iniciarJuego() {
    const pokedexUnfolded = document.getElementById('pokedex-unfolded');
    // Oculta la Pokédex y muestra el contenedor del juego
    document.getElementById('pokedex-container').style.display = 'none';
    pokedexUnfolded.style.display = 'flex';
    document.getElementById('game-container').style.display = 'block';

    //REPRODUCIR SONIDO
    const backgroundMusic = document.getElementById('background-music');

        
        backgroundMusic.addEventListener('ended', function() {
            
            this.currentTime = 0; 
            this.play(); 
        });

        
    backgroundMusic.play();


    if (listaDePokemon.length === 0) {
        listaDePokemon = await fetchPokemonList();
    }
    const pokemonCorrecto = obtenerPokemonAleatorio();
    const opciones = generarOpciones(pokemonCorrecto);
    mostrarPokemonSombra(pokemonCorrecto);
    mostrarOpciones(opciones, pokemonCorrecto);
}

// Inicia el juego al cargar la página
window.onload = function() {
    
};


