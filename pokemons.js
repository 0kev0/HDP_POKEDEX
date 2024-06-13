document.addEventListener('DOMContentLoaded', function() {
  const pokemonListContainer = document.getElementById('pokedex_list');
  const pokemonDetailsContainer = document.getElementById('pokemon-details');

  function fetchPokemonList() {
      let promises = [];
      for (let i = 1; i <= 151; i++) { // Aquí ajusté para obtener los primeros 151 Pokémon
          const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          promises.push(fetchPokemonDetails(url, i));
      }

      // Fetch all Pokémon details
      Promise.all(promises)
          .then(results => {
              results.sort((a, b) => a.index - b.index); // Ordenar por el índice

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

  function fetchPokemonDetails(url, index) {
      return fetch(url)
          .then(response => response.json())
          .then(data => {
              const pokemonCard = document.createElement('div');
              pokemonCard.classList.add('pokemon-card');
              pokemonCard.dataset.index = index;
              pokemonCard.innerHTML = `
                  <h2>${index}. ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                  <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
                  <img src="${data.sprites.front_default}" alt="${data.name}">
              `;
              
              // Agregar evento de clic para mostrar detalles
              pokemonCard.addEventListener('click', () => showPokemonDetails(data));

              return { index, element: pokemonCard };
          });
  }

  function showPokemonDetails(pokemon) {
      pokemonDetailsContainer.innerHTML = `
          <h2>${pokemon.id}. ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
          <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
          <p>Weight: ${pokemon.weight}</p>
          <p>Height: ${pokemon.height}</p>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <h3>Moves:</h3>
          <ul>
              ${pokemon.moves.slice(0, 5).map(move => `<li>${move.move.name}</li>`).join('')}
          </ul>
      `;
  }

  fetchPokemonList();
});