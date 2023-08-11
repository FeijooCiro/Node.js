const fs = require('fs/promises')

fs.readdir('./')
  .then(archivos => {
    for (let archivo of archivos) {
      console.log(archivo)
    }
  })
  .catch(error => {
    console.log(error)
  })