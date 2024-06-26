let listaDePokemon = []; // Array para almacenar los Pokémon obtenidos
let contadorIntentos = 0; // Contador de intentos
let contadorAciertos = 0; // Contador de aciertos
let contadorFallos = 0; // Contador de fallos
const MAX_INTENTOS = 5; // Máximo número de intentos permitidos

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
    contadorIntentos++; // Incrementa el contador de intentos

    if (pokemonSeleccionado.nombre === pokemonCorrecto.nombre) {
        contadorAciertos++; // Incrementa el contador de aciertos
        mostrarAlerta('¡Correcto!', 'alerta-correcto');
        revelarPokemon(pokemonCorrecto);
        setTimeout(iniciarJuego, 3000);
    } else {
        contadorFallos++; // Incrementa el contador de fallos
        mostrarAlerta('Incorrecto, prueba de nuevo.', 'alerta-incorrecto');
        revelarPokemon(pokemonCorrecto);
        setTimeout(iniciarJuego, 1000);
    }

    actualizarContadores(); // Actualiza la visualización de los contadores

    if (contadorIntentos >= MAX_INTENTOS) {
        document.getElementById('contador-intentos').innerText = "No más intentos, se acabó el juego";
        setTimeout(resetGame, 3000);
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

// Función para actualizar la visualización de los contadores
function actualizarContadores() {
    const contadorIntentosElemento = document.getElementById('contador-intentos');
    const contadorAciertosElemento = document.getElementById('contador-aciertos');
    const contadorFallosElemento = document.getElementById('contador-fallos');

    contadorIntentosElemento.innerText = `Intentos: ${contadorIntentos}`;
    contadorAciertosElemento.innerText = `Aciertos: ${contadorAciertos}`;
    contadorFallosElemento.innerText = `Fallos: ${contadorFallos}`;
}

// Función para mostrar una alerta
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta', tipo);

    const gameContainer = document.getElementById('game-container');
    gameContainer.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 2000);
}

// Función para iniciar el juego
async function iniciarJuego() {
    const pokedexUnfolded = document.getElementById('pokedex-unfolded');
    // Oculta la Pokédex y muestra el contenedor del juego
    document.getElementById('pokedex-container').style.display = 'none';
    pokedexUnfolded.style.display = 'flex';
    document.getElementById('game-container').style.display = 'block';

    // REPRODUCIR SONIDO
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

// Función para reiniciar el juego
function resetGame() {
    contadorIntentos = 0; // Reinicia el contador de intentos
    contadorAciertos = 0; // Reinicia el contador de aciertos
    contadorFallos = 0; // Reinicia el contador de fallos
    actualizarContadores(); // Actualiza la visualización de los contadores
    iniciarJuego(); // Inicia un nuevo juego
}

// Inicia el juego al cargar la página
window.onload = function() {
    actualizarContadores(); // Actualiza la visualización de los contadores al cargar la página
    iniciarJuego(); // Inicia el juego automáticamente
};

// Evento click para reiniciar el juego
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', function() {
    resetGame();
});

// Función para reiniciar el juego
function resetGame() {
    // Ocultar la pantalla de fin de juego
    const gameOverScreen = document.getElementById('game-over');
    gameOverScreen.style.display = 'none';

    // Reiniciar contadores
    contadorIntentos = 0;
    contadorAciertos = 0;
    contadorFallos = 0;

    // Actualizar la visualización de los contadores
    actualizarContadores();

    // Mostrar el contenedor del juego
    document.getElementById('pokedex-container').style.display = 'flex';
    document.getElementById('pokedex-unfolded').style.display = 'none';
}
