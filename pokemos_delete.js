document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('trainers-pokemon-list');
    const clearAllButton = document.getElementById('clear-all');
    let entrenadores = JSON.parse(localStorage.getItem('entrenadores')) || [];
    let db;

    function initDB() {
        const request = indexedDB.open('PokedexDB', 1);

        request.onsuccess = function(event) {
            db = event.target.result;
        };

        request.onerror = function(event) {
            console.error('Error opening IndexedDB:', event.target.errorCode);
        };
    }

    function deleteAllTrainersFromDB() {
        const transaction = db.transaction(['trainers'], 'readwrite');
        const objectStore = transaction.objectStore('trainers');
        const request = objectStore.clear();

        request.onsuccess = function() {
            console.log('All trainers cleared from IndexedDB');
        };

        request.onerror = function(event) {
            console.error('Error clearing trainers from IndexedDB:', event.target.errorCode);
        };
    }

    function deletePokemonFromDB(trainerName, pokemonName) {
        const transaction = db.transaction(['trainers'], 'readwrite');
        const objectStore = transaction.objectStore('trainers');
        const request = objectStore.get(trainerName);

        request.onsuccess = function(event) {
            const trainer = event.target.result;
            if (trainer) {
                const updatedPokemonList = trainer["Lista Pokemones"].filter(pokemon => pokemon.name !== pokemonName);
                trainer["Lista Pokemones"] = updatedPokemonList;
                const updateRequest = objectStore.put(trainer);

                updateRequest.onsuccess = function() {
                    console.log(`Pokemon ${pokemonName} removed from trainer ${trainerName} in IndexedDB`);
                };

                updateRequest.onerror = function(event) {
                    console.error('Error updating trainer in IndexedDB:', event.target.errorCode);
                };
            }
        };

        request.onerror = function(event) {
            console.error('Error getting trainer from IndexedDB:', event.target.errorCode);
        };
    }

    function renderTrainers() {
        container.innerHTML = ''; // Limpiar el contenido anterior
        entrenadores.forEach((trainer, index) => {
            const trainerElement = document.createElement('div');
            trainerElement.classList.add('trainer-card');
            trainerElement.innerHTML = `
                <h2>${trainer.nombre}</h2>
                <img src="${trainer.urlImagen}" alt="${trainer.nombre}">
                <h3>Pokémon List:</h3>
                <div class="pokemon-list">
                    ${trainer["Lista Pokemones"].map((pokemon, pokemonIndex) => `
                        <div>
                            <h4>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h4>
                            <img src="${pokemon.image}" alt="${pokemon.name}">
                            <button class="delete-button" data-trainer-index="${index}" data-pokemon-index="${pokemonIndex}">Eliminar</button>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(trainerElement);
        });
        setupDeleteButtons();
    }

    function setupDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const trainerIndex = parseInt(button.dataset.trainerIndex);
                const pokemonIndex = parseInt(button.dataset.pokemonIndex);
                const trainerName = entrenadores[trainerIndex].nombre;
                const pokemonName = entrenadores[trainerIndex]["Lista Pokemones"][pokemonIndex].name;

                // Eliminar el Pokémon del array del entrenador
                entrenadores[trainerIndex]["Lista Pokemones"].splice(pokemonIndex, 1);
                // Actualizar en el almacenamiento local
                localStorage.setItem('entrenadores', JSON.stringify(entrenadores));
                // Eliminar de IndexedDB
                deletePokemonFromDB(trainerName, pokemonName);
                // Renderizar de nuevo los entrenadores
                renderTrainers();
            });
        });
    }

    clearAllButton.addEventListener('click', function() {
        // Limpiar del localStorage
        localStorage.removeItem('entrenadores');
        entrenadores = [];
        // Limpiar de IndexedDB
        deleteAllTrainersFromDB();
        // Limpiar el HTML
        renderTrainers();
    });

    renderTrainers();
    initDB(); // Iniciar la base de datos IndexedDB
});
