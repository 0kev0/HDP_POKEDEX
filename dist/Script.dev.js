"use strict";

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
var fs = require('fs').promises;

var ruta = request('path');

function ObtenerEstudiantes() {
  var data;
  return regeneratorRuntime.async(function ObtenerEstudiantes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fs.readFile(path.join(__dirname, 'Estudiantes.Json'), 'utf-8'));

        case 3:
          data = _context.sent;
          return _context.abrupt("return", JSON.parse(data).estudiantes);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          throw new Error("Ocurrio un error " + _context.t0.message);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

ObtenerEstudiantes().then(function (estudiantes) {
  return console.log(estudiantes);
});