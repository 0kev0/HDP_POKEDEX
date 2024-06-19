document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('trainers-pokemon-list');
    const entrenadores = JSON.parse(localStorage.getItem('entrenadores')) || [];

    function renderTrainers() {
        container.innerHTML = ''; // Limpiar el contenido anterior
        entrenadores.forEach(trainer => {
            const trainerElement = document.createElement('div');
            trainerElement.classList.add('trainer-card');
            trainerElement.innerHTML = `
                <h2>${trainer.nombre}</h2>
                <img src="${trainer.urlImagen}" alt="${trainer.nombre}">
                <h3>Pokémon List:</h3>
                <div class="pokemon-list">
                    ${trainer["Lista Pokemones"].map(pokemon => `
                        <div>
                            <h4>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h4>
                            <img src="${pokemon.image}" alt="${pokemon.name}">
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(trainerElement);
        });
    }

    renderTrainers();

    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', function() {
        localStorage.removeItem('entrenadores'); // Limpiar el localStorage
        container.innerHTML = ''; // Limpiar la vista
        alert('Lista de entrenadores limpiada');
    });
});