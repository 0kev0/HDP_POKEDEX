class Body {
    constructor() {
        this.content = document.getElementById('content');
    }

    render() {
        const pokedexFolded = this.createPokedexFolded();
        const pokedexUnfolded = this.createPokedexUnfolded();
        this.content.appendChild(pokedexFolded);
        this.content.appendChild(pokedexUnfolded);
        this.setupEventListeners();
    }

    createPokedexFolded() {
        const pokedexFolded = document.createElement('div');
        pokedexFolded.className = 'Pokedex_Folded';
        pokedexFolded.id = 'ocultar';

        const pokedexFoldedTop = document.createElement('div');
        pokedexFoldedTop.className = 'Pokedex_Folded_top';
        pokedexFolded.appendChild(pokedexFoldedTop);

        const lente = document.createElement('div');
        lente.className = 'lente';
        lente.id = 'cerrar';
        lente.addEventListener('click', () => {
        // Mostrar Pokedex_UnFolded
        const pokedexUnfolded = document.getElementById('abrir_folder');
        pokedexUnfolded.classList.remove('hidden');

        // Ocultar Pokedex_Folded
        pokedexFolded.classList.add('hidden');
    });
        pokedexFoldedTop.appendChild(lente);

        const dotColors = ['Rojo', 'Verde', 'Amarillo'];
        dotColors.forEach(color => {
        const dot = document.createElement('div');
        dot.className = `Dot_${color}`;
        pokedexFoldedTop.appendChild(dot);
    });

        const pokedexFoldedCenter = document.createElement('div');
        pokedexFoldedCenter.className = 'Pokedex_Folded_Center';
        pokedexFolded.appendChild(pokedexFoldedCenter);
  
      const triangulo = document.createElement('div');
      triangulo.className = 'triangulo';
      pokedexFoldedCenter.appendChild(triangulo);
  
      return pokedexFolded;
    }
  
    createPokedexUnfolded() {
      const pokedexUnfolded = document.createElement('div');
      pokedexUnfolded.className = 'Pokedex_UnFolded hidden';
      pokedexUnfolded.id = 'abrir_folder';
  
      const pokedexUnfoldedTop = document.createElement('div');
      pokedexUnfoldedTop.className = 'Pokedex_Folded_top';
      pokedexUnfolded.appendChild(pokedexUnfoldedTop);
  
      const pokedexUnfoldedCenter = document.createElement('div');
      pokedexUnfoldedCenter.className = 'Pokedex_Folded_Center';
      pokedexUnfolded.appendChild(pokedexUnfoldedCenter);
  
      const trianguloUnfolded = document.createElement('div');
      trianguloUnfolded.className = 'triangulo';
      trianguloUnfolded.id = 'triangulo';
      pokedexUnfoldedCenter.appendChild(trianguloUnfolded);
  
      const pokedexScreen = document.createElement('div');
      pokedexScreen.className = 'Pokedex_Screen';
      pokedexUnfolded.appendChild(pokedexScreen);
  
      const pokedexList = document.createElement('div');
      pokedexList.className = 'Pokedex_List -center';
      pokedexList.id = 'pokedex_list';
      pokedexList.style.overflow = 'scroll';
      pokedexScreen.appendChild(pokedexList);
  
      const imgPokemon = document.createElement('div');
      imgPokemon.className = 'Pokedex_infoCard';
      imgPokemon.id = 'img_Pokemon';
      pokedexScreen.appendChild(imgPokemon);
  
      const pokedexStats = document.createElement('div');
      pokedexStats.className = 'Pokedex_Stats';
      pokedexScreen.appendChild(pokedexStats);
  
      const pokemonListaEvo = document.createElement('div');
      pokemonListaEvo.className = 'Pokedex_Evo txt-weight_md flex-column padding-mediano info_cartas';
      pokemonListaEvo.id = 'pokemon-listaEvo';
      pokedexStats.appendChild(pokemonListaEvo);
  
      const estdPokemon = document.createElement('div');
      estdPokemon.className = 'Pokedex_GeneralStats txt-weight_md flex-column padding-mediano info_cartas';
      estdPokemon.id = 'estd_Pokemon';
      pokedexStats.appendChild(estdPokemon);
  
      const movPokemon = document.createElement('div');
      movPokemon.className = 'Pokedex_Moves flex-column padding-mediano txt-weight_md info_cartas';
      movPokemon.id = 'Mov_Pokemon';
      pokedexScreen.appendChild(movPokemon);
  
      const seleccionarPokemon = document.createElement('div');
      seleccionarPokemon.className = 'seleccionar_pokemon';
      pokedexUnfolded.appendChild(seleccionarPokemon);
  
      const selectedPokemons = document.createElement('div');
      selectedPokemons.id = 'selected-pokemons';
      selectedPokemons.className = 'selected-pokemons-container';
      seleccionarPokemon.appendChild(selectedPokemons);
  
      const saveSelectionButton = document.createElement('button');
      saveSelectionButton.id = 'save-selection';
      saveSelectionButton.textContent = 'Guardar Selección';
      seleccionarPokemon.appendChild(saveSelectionButton);

  
      const companionsContainer = document.createElement('div');
      companionsContainer.id = 'companions-container';
      companionsContainer.className = 'companions-container';
      pokedexUnfolded.appendChild(companionsContainer);
  
      return pokedexUnfolded;
    }
  
    setupEventListeners() {
      const ocultar = document.getElementById('ocultar');
      const ocultar2 = document.getElementById('cerrar_again');
      const btnOpen = document.getElementById('abrir_folder');
  
      ocultar2.addEventListener('click', () => {
        ocultar.classList.remove('hidden');
        btnOpen.classList.add('hidden');
        ocultar2.style.display = 'none';
      });
    }
  }
  
  
  // Initialization function
  function initializePage() {
    const body = new Body();
    body.render();
  }
  
  // Event listener for DOMContentLoaded event
  document.addEventListener('DOMContentLoaded', initializePage);
  