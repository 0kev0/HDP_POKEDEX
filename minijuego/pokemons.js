async function fetchPokemonList() {
    let promises = [];
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(response => response.json()));
    }

    const results = await Promise.all(promises);
    return results.map(pokemon => ({
        nombre: pokemon.name,
        imagen: pokemon.sprites.front_default
    }));
}
