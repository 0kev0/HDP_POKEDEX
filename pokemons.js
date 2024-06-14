document.addEventListener('DOMContentLoaded', function() {
    const pokemonListContainer = document.getElementById('pokedex_list');
    const pokemonDetailsContainer = document.getElementById('pokemon-details');
    const img_pokemon = document.getElementById('img_Pokemon');
    const list_pokemons = document.getElementById('pokemon-listaEvo');
    const estd_pokemons = document.getElementById('estd_Pokemon');
    const Mov_pokemons = document.getElementById('Mov_Pokemon');

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
            <h3>Stats:</h3>
            <ul>
                ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
            </ul>
        `;
    }
    
    function showPokemons(evolutions) {
        list_pokemons.innerHTML = `
            <h3>Evolutions:</h3>
            <ul>
                ${evolutions.map(evo => `<li>${evo}</li>`).join('')}
            </ul>
        `;
    }
    fetchPokemonList();
});