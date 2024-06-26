//import ToggleButton from '/open_close.js';

class Navbar {
    constructor(items) {
        this.items = items;
    }

    render() {
        const nav = document.createElement('nav');
        nav.classList.add ('nav2','nav_responsive');

        const logo = document.createElement('a');
        logo.className = 'logo';
        logo.title = 'Pokedex Icon';
        logo.innerHTML = 'POKE_DEX <img src="/IMG/Pokeball_SinBg.png" width="50" />';
        nav.appendChild(logo);

        const ul = document.createElement('ul');
        this.items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            li.appendChild(a);
            ul.appendChild(li);
        });

        nav.appendChild(ul);

        return nav;
    }
}

class Body {
    constructor() {
        this.content = document.getElementById('content');
    }

    render() {
        const sidebar = this.createSidebar();
        const pokedexFolded = this.createPokedexFolded();
        const pokedexUnfolded = this.createPokedexUnfolded();

        this.content.appendChild(sidebar);
        this.content.appendChild(pokedexFolded);
        this.content.appendChild(pokedexUnfolded);
    }

    createSidebar() {
        const sidebar = document.createElement('sidebar');
        sidebar.className = 'sidebar_P';

        const logo = document.createElement('a');
        logo.className = 'logo';
        logo.title = 'Pokedex Icon';
        logo.setAttribute('onclick', 'openPopup()');
        logo.innerHTML = 'Equipo <img src="/IMG/Pokeball_SinBg.png" width="50" />';
        sidebar.appendChild(logo);

        return sidebar;
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

        const addCompanionsButton = document.createElement('button');
        addCompanionsButton.className = 'boton-primario';
        addCompanionsButton.id = 'add-companions';
        addCompanionsButton.textContent = 'Agregar Acompañantes';
        seleccionarPokemon.appendChild(addCompanionsButton);

        const companionsContainer = document.createElement('div');
        companionsContainer.id = 'companions-container';
        companionsContainer.className = 'companions-container';
        pokedexUnfolded.appendChild(companionsContainer);

        return pokedexUnfolded;
    }
}

class Footer {
    constructor() {
        this.content = document.getElementById('content');
    }

    render() {
        const footer = document.createElement('footer');
        footer.className = 'pie-pagina plta-dos-backgraund-B';
        footer.style.marginTop= '50px';

        const grupo1 = document.createElement('div');
        grupo1.className = 'grupo-1';
        footer.appendChild(grupo1);

        const fotherBox1 = document.createElement('div');
        fotherBox1.className = 'Fother-box';
        grupo1.appendChild(fotherBox1);

        const figure = document.createElement('figure');
        fotherBox1.appendChild(figure);

        const a1 = document.createElement('a');
        a1.href = 'https://vectorified.com/pokedex-icon';
        figure.appendChild(a1);

        const img = document.createElement('img');
        img.src = '/IMG/Pokeball_SinBg.png';
        img.width = '350';
        a1.appendChild(img);

        const fotherBox2 = document.createElement('div');
        fotherBox2.className = 'Fother-box';
        grupo1.appendChild(fotherBox2);

        const h2_1 = document.createElement('h2');
        h2_1.textContent = 'Universidad de el Salvador';
        fotherBox2.appendChild(h2_1);

        const p1 = document.createElement('p');
        p1.textContent = 'Departamento de Ingenieria y Arquitectura';
        fotherBox2.appendChild(p1);

        const p2 = document.createElement('p');
        p2.textContent = 'Ingenieria de Sistemas Informaticos';
        fotherBox2.appendChild(p2);

        const fotherBox3 = document.createElement('div');
        fotherBox3.className = 'Fother-box';
        grupo1.appendChild(fotherBox3);

        const h2_2 = document.createElement('h2');
        h2_2.textContent = 'SIGUENOS';
        fotherBox3.appendChild(h2_2);

        const redSocial = document.createElement('div');
        redSocial.className = 'red-social';
        fotherBox3.appendChild(redSocial);

        const socialLinks = [
            { id: 'fb', href: '#', className: 'fa fa-facebook fb' },
            { id: 'ig', href: '#', className: 'fa fa-instagram' },
            { id: 'tw', href: '#', className: 'fa fa-twitter' },
            { id: 'yt', href: 'https://youtu.be/dQw4w9WgXcQ', className: 'fa fa-youtube' }
        ];

        socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.id = link.id;
            a.href = link.href;
            a.className = link.className;
            redSocial.appendChild(a);
        });

        const grupo2 = document.createElement('div');
        grupo2.className = 'grupo-2';
        footer.appendChild(grupo2);

        const small = document.createElement('small');
        small.innerHTML = '&copy; 2024 <b>Drip.css</b> - Todos los Derechos Reservados.';
        grupo2.appendChild(small);

        this.content.appendChild(footer);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navbarItems = [
        { href: '/index.html', text: 'Inicio' },
        { href: '/minijuego/Game.html', text: '?' },
        { href: '/abaut.html', text: 'Contacto' },
        { href: '/entrenadores.html', text: 'Equipos' },
        { href: 'https://github.com/0kev0/0Kev0.github.io', text: 'GitHub' }
    ];

    const navbar = new Navbar(navbarItems);
    const navElement = navbar.render();

    const navContainer = document.getElementById('navbar-container');
    navContainer.appendChild(navElement);

    const body = new Body();
    const footer = new Footer();

    body.render();
    footer.render();
});

//document.addEventListener('DOMContentLoaded', () => {
// const toggleButton = new ToggleButton();
//});
