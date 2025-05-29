document.addEventListener('DOMContentLoaded', function () {
    // Navigazione ai vari comandi
    const comandoGioca = document.getElementById('comando-gioca');
    const comandoRose = document.getElementById('comando-rose');
    const comandoMercato = document.getElementById('comando-mercato');
    const comandoRegole = document.getElementById('comando-regole');

    if (comandoGioca) {
        comandoGioca.addEventListener('click', function () {
            window.location.href = 'gamepage.html';
        });
    }

    if (comandoRose) {
        comandoRose.addEventListener('click', function () {
            window.location.href = 'rosa.html';
        });
    }

    if (comandoMercato) {
        comandoMercato.addEventListener('click', function () {
            window.location.href = 'mercato.html';
        });
    }

    if (comandoRegole) {
        comandoRegole.addEventListener('click', function () {
            window.location.href = 'regole.html';
        });
    }

    const citazioni = [
        `"Nel calcio come negli scacchi, chi pensa tre mosse avanti, non rincorre: comanda"`,
        `"Un campo da calcio è una scacchiera in movimento: chi conosce la geometria, detta il ritmo"`,
        `"Il regista è il re invisibile: non segna, ma tutto gira intorno a lui"`,
        `"Il numero 10 è la regina del campo: ovunque e letale"`,
        `"Il difensore centrale è il rocchetto di un castello: se cade lui, cade tutto"`,
        `"Il calcio è istinto e caos, ma chi lo doma con la mente... gioca a scacchi"`,
        `"Ogni duello uno contro uno è uno scacco personale: o ti salvi, o ti pieghi"`,
        `"Né nel calcio né negli scacchi vince chi va più veloce. Vince chi sa aspettare il momento giusto"`,
        `"L’1-2 nello stretto è il cavallo sulla scacchiera: imprevedibile, elegante, letale"`,
        `"Il portiere è come il re negli scacchi: vulnerabile, ma decisivo. Se cade lui, finisce il gioco"`,
        `"Il calcio è istinto che si maschera da tattica. Gli scacchi sono tattica che maschera l’istinto"`
    ];

    const autori_citazioni = [
        `- Johan Cruijff`,
        `- Pep Guardiola`,
        `- Arrigo Sacchi`,
        `- Pelè`,
        `- Fabio Capello`,
        `- Roberto Baggio`,
        `- Cristiano Ronaldo`,
        `- Marcello Lippi`,
        `- Sir Alex Ferguson`,
        `- Carlo Ancelotti`
    ];

    const fraseRandom = citazioni[Math.floor(Math.random() * citazioni.length)];
    const autoreRandom = autori_citazioni[Math.floor(Math.random() * autori_citazioni.length)];
    const paragrafo_citazioni = document.getElementById('frase-random');
    const paragrafo_autore = document.getElementById('autore-random');

    if (paragrafo_citazioni) {
        paragrafo_citazioni.textContent = fraseRandom;
    }

    if (paragrafo_autore) {
        paragrafo_autore.textContent = autoreRandom;
    }
});


