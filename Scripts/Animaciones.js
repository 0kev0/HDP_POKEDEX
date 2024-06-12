function AbrirPokedex(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    const FoldedPokedex = document.querySelector('.lente');
    const rojo = document.querySelector('.Dot_Rojo');
    const verde = document.querySelector('.Dot_Verde');
    const amarillo = document.querySelector('.Dot_Amarillo');

    FoldedPokedex.remove();
    rojo.remove();
    verde.remove();
    amarillo.remove();
    console.log('¡Hola!');
    // Ejemplo: Mostrar un mensaje después de 3 segundos
    const UnFoldedPokedex = document.querySelector('.Pokedex_Folded');
    const Pokedex_Screen = document.createElement('div');


    setTimeout(() => {
        console.log('¡Hola después de 3 segundos!');

        // Obtén el elemento Pokedex_UnFolded
        UnFoldedPokedex.classList.remove('Pokedex_Folded');
        UnFoldedPokedex.classList.add('Pokedex_UnFolded');

    }, 200);

    setTimeout(() => {
        // Crea el elemento Pokedex_Screen
        Pokedex_Screen.className = 'Pokedex_Screen';
        UnFoldedPokedex.appendChild(Pokedex_Screen);


    }, 1000);

    setTimeout(() => {
        const Titulo = document.createElement('h1');
        Titulo.textContent = 'WELCOME TO HDP_OKEDEX'
        Titulo.classList = 'Inicial_Resaltada_h2 tituloThB transicionDownUp';

        const Dripcss = document.createElement('h1');
        Dripcss.textContent = 'Powered by Drip_CSS'
        Dripcss.classList = 'Inicial_Resaltada_h2 titulo transicionDownUp';

        const Pokedex_Rest = document.createElement('div');
        Pokedex_Rest.className = 'Pokedex_rest';

        const logo = document.createElement('img');
        logo.classList = 'img_shadowDark Img_Size_sm';
        logo.src = 'IMG/icono.png'; 
        

        Pokedex_Screen.appendChild(Pokedex_Rest);
        Pokedex_Rest.appendChild(Titulo);
        Pokedex_Rest.appendChild(Dripcss);
        Pokedex_Rest.appendChild(logo);




    }, 1000);


}




const openbutton = document.querySelector('.lente');
openbutton.addEventListener('click', AbrirPokedex);