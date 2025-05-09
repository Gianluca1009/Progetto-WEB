# Progetto-WEB
## progetto scacchi - calcio

### APPUNTI STRUTTURE
-STRUTTURA PEDINA-CELLA NELLA SCACCHIERA

    ```html
    <td cella>
        <div pedina>
            <img tipo_pedina>
            <h1 testo calciatore>
        </div>
    </td>

-STRUTTURA CALCIATORE-CELLA NELLE TABELLE DRAFT

    <td foto_draftcell>
        <div santino-container>
            <img class="santino">
        </div>
    </div>
    ```
###




# Generic To-do:

    adattabilita alla pagina/risoluzione                                                            ✅
    progetto in tre due pagine (login + info/(preparazione partita/pagina di gioco))                ✅
    pulire il codice, commentare e usare piu funzioni possibili per mantenere leggibilità           ✅
    separazione tra listener e funzioni in file separati                                            ✅
    rendere la ricarica della pagina più smooth
    rallentare le animazioni per non far vedere gli elementi che spariscono alla ricarica

# index-page:

    descrizione gioco e regole
    immagini                                                                                        ✅
    
    navigation bar informativa                                                                      ✅
    login / account
    informazioni account con php

# mercato page:

    to-do
    
# rose-page:

    printare il database su una pagina html
    gestione programmatica statistiche dei calciatori


# Game-page:

    bottone start                                                                                   ✅
    bottone random                                                                                  ✅
    doppio bottone pronto post-draft                                                                ✅
    bottone torna alla home                                                                         ✅
    ricarica la pagina cliccando il titolo                                                          ✅
    modificare tabella draft (meno celle, nomi e stats giocatori)                                   ✅ 
    drag and drop dei giocatori                                                                     ✅
    posizionare cognome del giocatore sotto la pedina                                               ✅
    assegnare attributi ai giocatori tramite oggetti javascript
    fare query SQL in base all'url dell'immagine e popolare gli attributi di ogni pedina
    fare una tabella con colonne asimmetriche per il draft                                          ✅
    tre righe ogni 10 secondi per poter assegnare un giocatore a una pedina
    permettere di fare drag and drop tra santini e pedine dello stesso colore                       ✅
    trovare una soluzione ai nomi lunghi nelle celle div
    gestire meglio il banner pre-ricarica della pagina
    correggere il fatto che il re rimane in scacco quando non dovrebbe nella promozione pedone
    correggere il fatto che posso spostare altre pedine durante la promozione pedone

    mosse valide                                                                                    ✅
    consiglia-mosse                                                                                 ✅
    log delle mosse
    muovere pezzi                                                                                   ✅
    deselezionare pedina                                                                            ✅
    bottone torna alla home                                                                         ✅
    logica pedina mangiata                                                                          ✅
    pedone diventa qualsiasi pedine se arriva in fondo alla scacchiera                              ✅
    bloccare il turno finche la pedina promossa non viene sostituita                                ✅
    gestire la promozione del pedone allo scadere del timer
    se il re si muove non si aggiorna la posizione del re per il colore dello scacco
    generalizzare lo script di creazione pedine                                                     ✅
    abolire i ruoli                                                                                 ✅
    far apparire dei log con statistiche ai lati della scacchiera
    termina partita se re mangiato                                                                  ✅
    logica di partita terminata (funzione endgame)                                                  ✅
    funzione rigioca                                                                                ✅
    funzione torna alla home                                                                        ✅
    aggiungere bottoni restart, restart draft e go home anche durante la partita                    ✅
    funzione random draft
    pulsanti e funzioni:                                                                            ✅
    -restart game                                                                                   ✅
    -restart draft                                                                                  ✅
    -go home
    assegnazione punteggi

    (2.0)
    assegnazione dei punti al player vincitore
    mercato dei calciatori
                                                                                           ✅


# utilizzo DataBase
    creazione tabelle
    inserimento tuple con file init
    connettersi al codice nodejs
    fare query per popolare il draft
    
    
# CSS

1. index

    rendere la pagina più accogliente
    completare hover e puntatori sui bottoni delle altre pagine





2. gampage

    modularizzare le classi creando classi base generiche (bottoni, testo, ecc...)
    correggere lo script per l'adattamento del grid container                                       ✅
    trovare degli hover carini per bottoni
    modificare le barre dei timer e separarle

    ERRORI
    promozione pedone avviene anche quando fallisce la mangiata anche la mangiata del re

    a volte le pedine non possono mangiare

    bisogna obbligare il player a mettere giocatori su tutte le pedine

    i brasiliani senza nome non hanno parsing corretto di NULL

    L'ultimo cognome che draggi manuale nel draft ha font piu grande

    


    