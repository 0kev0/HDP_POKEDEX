// var fs = require('fs');
// var n = 0; // Asigna un valor inicial a 'n'


// function sumar(callback) {
//     fs.readFile('NUMEROS.txt', function leerNumero(err, contenido) {
//         n = parseInt(contenido);
//         n++;
//         callback()
//     })
// }


// function MostrarNumero() {
//     console.log(n);
// }

// sumar(MostrarNumero);

// // const BtnPrueba = document.createElement('button');
// BtnPrueba.classList.add('buttontest_Th2', 'self-right'); // Agrega clases al botón
// BtnPrueba.textContent = 'Prueba';

// document.querySelector('.container2').appendChild(BtnPrueba);

// BtnPrueba.addEventListener('click', () => {
//     fs.readFile('NUMEROS.txt', function leerNumero(err, contenido) {
//         if (err) {
//             console.error('Error al leer el archivo:', err);
//             return;
//         }
//         n = parseInt(contenido);
//         n++;
//         console.log(n);
//     });
// });



const fs = require('fs').promises
const path = require('path')

async function ObtenerEstudiantes() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'Estudiantes.Json'), 'utf-8')
        return JSON.parse(data).estudiantes
    } catch (err) {
        throw new Error("Ocurrio un error " + err.message)
    }
}

ObtenerEstudiantes()
    .then(estudiantes => {
            console.log("Datos de los estudiantes", estudiantes);
    })
    .catch(err => {
        console.log(err.message);
    })