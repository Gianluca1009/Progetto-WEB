// const express = require('express');
const express = require('express');
const { get72RandomCalciatori } = require('./connection.js');


const app = express();
const port = 3306;

app.use(express.json());

function populate_draft(){
    // Dati dei calciatori con tutte le informazioni necessarie
    const OggettiCalciatori = []
    get72RandomCalciatori().then(random_calciatori => {
        random_calciatori.forEach(info_calciatore => {
            OggettiCalciatori.push(new Calciatore(info_calciatore.nome, info_calciatore.cognome, info_calciatore.img_url, info_calciatore.data_nascita, info_calciatore.nazionalita, info_calciatore.ruolo, info_calciatore.squadra, info_calciatore.numero_maglia, info_calciatore.goal, info_calciatore.assist, info_calciatore.presenze, info_calciatore.cartellini_gialli, info_calciatore.cartellini_rossi, info_calciatore.trofei, info_calciatore.record_goal, info_calciatore.record_assist));
        });
    });
    console.log(OggettiCalciatori);
}


app.get('/calciatori', (req, res) => {
    console.log(get72RandomCalciatori().then(calciatori => {
        res.json(calciatori);
    }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
