//----- GESTIONE INIZIALIZZAZIONE PEDINE ------//

// DIzionario che definisce i dati (posizioni iniziali, colore, id e immagini) delle pedine
const pezzi = {
    torre: {
        posizioni: [
            { pos: '00', colore: 'nero' },
            { pos: '05', colore: 'nero' },
            { pos: '55', colore: 'bianco' },
            { pos: '50', colore: 'bianco' }
        ],
        class: 'torre',
        id: { bianco: 't', nero: 'T' },
        img: {
            CLASSIC: {
                bianco: 'images/pedine/torre_bianca_classic.png',
                nero: 'images/pedine/torre_nera_classic.png'
            },
            MODERN: {
                bianco: 'images/pedine/torre_bianca.png',
                nero: 'images/pedine/torre_nera.png'
            }
        }
    },
    alfiere: {
        posizioni: [
            { pos: '04', colore: 'nero' },
            { pos: '54', colore: 'bianco' }
        ],
        class: 'alfiere',
        id: { bianco: 'a', nero: 'A' },
        img: {
            CLASSIC: {
                bianco: 'images/pedine/alfiere_bianco_classic.png',
                nero: 'images/pedine/alfiere_nero_classic.png'
            },
            MODERN: {
                bianco: 'images/pedine/alfiere_bianco.png',
                nero: 'images/pedine/alfiere_nero.png'
            }
        }
    },
    regina: {
        posizioni: [
            { pos: '02', colore: 'nero' },
            { pos: '52', colore: 'bianco' }
        ],
        class: 'regina',
        id: { bianco: 'q', nero: 'Q' },
        img: {
            CLASSIC: {
                bianco: 'images/pedine/regina_bianca_classic.png',
                nero: 'images/pedine/regina_nera_classic.png'
            },
            MODERN: {
                bianco: 'images/pedine/regina_bianca.png',
                nero: 'images/pedine/regina_nera.png'
            }
        }
    },
    re: {
        posizioni: [
            { pos: '03', colore: 'nero' },
            { pos: '53', colore: 'bianco' }
        ],
        class: 're',
        id: { bianco: 'r', nero: 'R' },
        img: {
            CLASSIC: {
                bianco: 'images/pedine/re_bianco_classic.png',
                nero: 'images/pedine/re_nero_classic.png'
            },
            MODERN: {
                bianco: 'images/pedine/re_bianco.png',
                nero: 'images/pedine/re_nero.png'
            }
        }
    },
    cavallo: {
        posizioni: [
            { pos: '01', colore: 'nero' },
            { pos: '51', colore: 'bianco' }
        ],
        class: 'cavallo',
        id: { bianco: 'c', nero: 'C' },
        img: {
            CLASSIC: {
                bianco: 'images/pedine/cavallo_bianco_classic.png',
                nero: 'images/pedine/cavallo_nero_classic.png'
            },
            MODERN: {
                bianco: 'images/pedine/cavallo_bianco.png',
                nero: 'images/pedine/cavallo_nero.png'
            }
        }
    },
    pedone: {
        class: 'pedone',
        id: { bianco: 'p', nero: 'P' },
        img: {
            CLASSIC: {
                bianco: 'images/pedine/pedone_bianco_classic.png',
                nero: 'images/pedine/pedone_nero_classic.png'
            },
            MODERN: {
                bianco: 'images/pedine/pedone_bianco.png',
                nero: 'images/pedine/pedone_nero.png'
            }
        }
    }
};

// Funzione per creare la scacchiera e prepararla alla partita
function StartPosition() {
    const stile = getStyle(); // "CLASSIC" o "MODERN"

    function creaPedina(tipo, colore, posizione) {
        const cell = document.getElementById(posizione);
        const pedina = document.createElement('div');
        const img = document.createElement('img');
        
        pedina.className = 'pedina';
        pedina.id = pezzi[tipo].id[colore];
        pedina.draggable = false;
        
        img.className = tipo;
        img.src = pezzi[tipo].img[stile][colore];
        img.alt = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${colore}`;
        img.draggable = false;
        
        pedina.appendChild(img);
        cell.appendChild(pedina);
    }

    for (const [tipo, config] of Object.entries(pezzi)) {
        if (tipo !== 'pedone' && config.posizioni) {
            config.posizioni.forEach(({ pos, colore }) => {
                creaPedina(tipo, colore, pos);
            });
        }
    }

    for (let i = 0; i < 6; i++) {
        creaPedina('pedone', 'nero', `1${i}`);
        creaPedina('pedone', 'bianco', `4${i}`);
    }

    ListenerMovimentoPedine();
}


