# Progetto-WEB
## progetto scacchi - calcio
### nota struttara pedine-celle

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

# To-do:
    adattabilita alla pagina/risoluzione                                                            ✅
    progetto in tre(/due) pagine (login + info/(preparazione partita/pagina di gioco))
    pulire il codice, commentare e usare piu funzioni possibili per mantenere leggibilità           ✅
    separazione tra listener e funzioni in file separati                                            ✅

# Login-page:
    descrizione gioco e regole
    immagini
    capire come fare la parte di login
    navigation bar informativa                                                                      ✅
    stile css

# Prep-page:
    bottone start                                                                                   ✅
    bottone random
    doppio bottone pronto post-draft                                                                ✅
    bottone torna alla home
    modificare tabella draft (meno celle, nomi e stats giocatori)                                   ✅ 
    drag and drop dei giocatori                                                                     ✅
    posizionare cognome del giocatore sotto la pedina                                               ✅
    assegnare attributi ai giocatori tramite oggetti javascript
    fare query SQL in base all'url dell'immagine e popolare gli attributi di ogni pedina
    stile css
    fare una tabella con colonne asimmetriche per il draft                                          ✅
    tre righe ogni 10 secondi per poter assegnare a una pedina


# Game-page:
    mosse valide                                                                                    ✅
    consiglia-mosse                                                                                 ✅
    log delle mosse
    muovere pezzi                                                                                   ✅
    deselezionare pedina                                                                            ✅
    bottone torna alla home
    logica pedina mangiata                                                                          ✅
    pedone diventa qualsiasi pedine se arriva in fondo alla scacchiera
    generalizzare lo script di creazione pedine                                                     ✅
    stile css
    abolire i ruoli
    far apparire dei log con statistiche ai lati della scacchiera (listener) 
    logica scacco al re                                                                            ✅                      
    termina partita se re mangiato                                                                  
    logica di partita terminata

    (2.0)
    assegnazione dei punti al player vincitore 
    mercato dei calciatori

# elenco delle possibili condizioni da cercare in un database:
    1.goal fatti in carriera
    2.assist fatti in carriera
    3.presenze in carriera
    4.cartellini gialli ricevuti in carriera
    5.cartellini rossi ricevuti in carriera
    6.numero di maglia attuale più alto
    7.vittorie in carriera
    8.numero di trofei vinti in carriera
    9.record di gol stagionale
    10.record di assist stagionale

# utilizzo DataBase
    provare l'utilizzo di database gratuiti come SportsDB o altri, tenendo in considerazione
    la limitazione di richieste al minuto.
    
    
