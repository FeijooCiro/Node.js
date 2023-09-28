const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/generate', (req, res) => {
    const frase = req.body.frase;

    if (typeof frase !== 'string') {
        res.status(400).send('Por favor, ingrese una frase válida.');
        return;
    }

    const letraP = generateFigure(frase);

    res.send(`<pre>${letraP}</pre>`);
});

// Función para generar la figura
function generateFigure(frase) {
    let vocales = 'aeiouAEIOU';
    let resultado = '';

    for (let i = 0; i < frase.length; i++) {
        if (vocales.includes(frase[i])) {
            resultado += 'P' + frase[i] + 'P';
        } else {
            resultado += frase[i];
        }
    }
    return resultado;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
