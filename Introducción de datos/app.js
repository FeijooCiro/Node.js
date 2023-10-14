const http = require('http')
const fs = require('fs')
const querystring = require('querystring');

const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4'
  }

const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:8888' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/') {
    camino = 'public/index.html';
  }
  encaminar(pedido, respuesta, camino);
});

servidor.listen(8888);

function encaminar(pedido, respuesta, camino) {
  console.log(camino);
  switch (camino) {
    case 'public/generarfigura': {
      if (pedido.method === 'POST') {
        recuperar(pedido, respuesta);
      } else {
        respuesta.writeHead(405, { 'Content-Type': 'text/plain' });
        respuesta.end('Método no permitido');
      }
      break;
    }
    default: {
      fs.stat(camino, error => {
        if (!error) {
          fs.readFile(camino, (error, contenido) => {
            if (error) {
              respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
              respuesta.write('Error interno');
              respuesta.end();
            } else {
              const vec = camino.split('.');
              const extension = vec[vec.length - 1];
              const mimearchivo = mime[extension];
              respuesta.writeHead(200, { 'Content-Type': mimearchivo });
              respuesta.write(contenido);
              respuesta.end();
            }
          });
        } else {
          respuesta.writeHead(404, { 'Content-Type': 'text/html' });
          respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
          respuesta.end();
        }
      });
    }
  }
}

function recuperar(pedido, respuesta) {
  let info = '';
  pedido.on('data', datosparciales => {
    info += datosparciales;
  });
  pedido.on('end', () => {
    const datos = querystring.parse(info);
    const numeroLineas = parseInt(datos.numeroLineas, 10);

    if (isNaN(numeroLineas) || numeroLineas < 1) {
      respuesta.writeHead(400, { 'Content-Type': 'text/plain' });
      respuesta.write('Número de líneas inválido');
      respuesta.end();
      return;
    }

    const figura = generarFigura(numeroLineas);
    respuesta.writeHead(200, { 'Content-Type': 'text/plain' });
    respuesta.write(figura);
    respuesta.end();
  });
}

function generarFigura(numeroLineas) {
  let figura = '';

  for (let i = 1; i <= numeroLineas; i++) {
    for (let j = 1; j <= numeroLineas - i; j++) {
      figura += ' ';
    }
    for (let k = 1; k <= 2 * i - 1; k++) {
      if (k % 2 === 0) {
        figura += '*';
      } else {
        figura += 'o';
      }
    }
    figura += '\n';
  }

  return figura;
}

console.log('Servidor web iniciado');
