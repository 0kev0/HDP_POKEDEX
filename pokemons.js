document.addEventListener('DOMContentLoaded', function() {
    const pokemonListContainer = document.querySelector('.Pokedex_List');

    function fetchPokemonList() {
      for (let i = 1; i <= 100; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        fetchPokemonDetails(url, pokemonListContainer, i);
      }
    }

    function fetchPokemonDetails(url, container, index) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const pokemonCard = document.createElement('div');
          pokemonCard.classList.add('pokemon-card');
          pokemonCard.innerHTML = `
            <h2>${index}. ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
            <img src="${data.sprites.front_default}" alt="${data.name}">
          `;
          container.appendChild(pokemonCard);
        })
        .catch(error => {
          container.innerHTML += `<p>Error: ${error.message}</p>`;
        });
    }

    fetchPokemonList();
});
