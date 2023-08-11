const os = require('os')

console.log('Memoria libre antes del vector:' + os.freemem() + ' bytes')

let Vector = [];

for (let i = 0; i < 100000; i++) {
    let Entero = Math.floor(Math.random() * 100) + 1
    Vector.push(Entero)
}

console.log('Memoria libre después del vector:' + os.freemem() + ' bytes')