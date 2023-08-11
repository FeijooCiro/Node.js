const fs = require('fs/promises')

fs.readFile('./archivo1b.txt')
  .then(datos => {
    console.log(datos.toString())
  })
  .catch(error => {
    console.log(error)
  })

console.log('última línea del programa')