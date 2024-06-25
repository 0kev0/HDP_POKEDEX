export default class ToggleButton {
    constructor() {
        this.btn = document.getElementById('abrir_folder');
        this.ocultar = document.getElementById('ocultar');
        this.ocultar2 = document.getElementById('cerrar_again');

        // Ocultar inicialmente el elemento ocultar y mostrar el botón
        this.ocultar.classList.add('hidden');
        this.btn.classList.remove('hidden');

        // Agregar event listener al botón abrir
        this.abrirClickHandler = this.abrirClickHandler.bind(this);
        this.abrir.addEventListener('click', this.abrirClickHandler);

        // Agregar event listener al botón cerrar nuevamente
        this.ocultar2ClickHandler = this.ocultar2ClickHandler.bind(this);
        this.ocultar2.addEventListener('click', this.ocultar2ClickHandler);
    }

    abrirClickHandler() {
        this.ocultar.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
        this.btn.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
        this.ocultar.classList.add('hidden');
        this.btn.classList.remove('hidden');
        this.ocultar2.style.display = 'block';
    }

    ocultar2ClickHandler() {
        this.ocultar.classList.remove('hidden');
        this.btn.classList.add('hidden');
        this.ocultar2.style.display = 'none';
    }

    // Método opcional para limpiar los event listeners cuando ya no se necesiten
    cleanup() {
        this.abrir.removeEventListener('click', this.abrirClickHandler);
        this.ocultar2.removeEventListener('click', this.ocultar2ClickHandler);
    }
}
