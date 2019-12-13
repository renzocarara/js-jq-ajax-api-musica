// Eseguire una chiamata ajax all'api di boolean: https://flynn.boolean.careers/exercises/api/array/music
// che restituisce una lista di 10 dischi musicali.
// Utilizzando handlebars, disegnare in pagina una card per ogni disco.
// BONUS: aggiungere una tendina con i generi: pop, rock, metal e jazz, che permette
// all'utente di filtrare i dischi visualizzati in base al genere selezionato.
// Nome repo: js-jq-ajax-api-musica
// -----------------------------------------------------------------------------
$(document).ready(function() {

    // chiamata AJAX per recuperare dati dalla API Boolean
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/array/music',
        method: 'get',
        success: function(musicCardsData) {
            console.log("musicCardsData.response", musicCardsData.response);
            handleResponseData(musicCardsData.response);
        },
        error: function() {
            alert("ERRORE: il server non risponde!");
        }
    });

    // BONUS - permettere selezione del genere della music card

    // usare evento .change per intercettare il cambiamento del valore dell'elemento 'select'
    // usare attributo data-genre
    // usare each per scorrere le cards





}); // fine document ready

// ---------------------------- FUNCTIONs --------------------------------------

function handleResponseData(cardsData) {

    // recupero il codice html dal template HANDLEBARS
    var cardTemplate = $('#music-card-template').html();
    console.log("cardTemplate", cardTemplate);
    // compilo il template HANDLEBARS, lui mi restituisce un funzione
    var cardFunction = Handlebars.compile(cardTemplate);

    // ciclo su tutto l'array composto dai dati ricevuti dal server
    for (var i = 0; i < cardsData.length; i++) {

        // creo un oggetto con i dati da inserire nella singola card
        var context = {
            'author': cardsData[i].author,
            'genre': cardsData[i].genre,
            'poster': cardsData[i].poster,
            'title': cardsData[i].title,
            'year': cardsData[i].year
        };
        // console.log("i=", i, "\ncontext:", context);
        // chiamo la funzione generata da HANDLEBARS per popolare il template
        // passo alla funzione l'oggetto che contiene i valori che andranno a sostituire i placeholder,
        var card = cardFunction(context);
        console.log("card popolata:", card);

        // aggiungo nella mia pagina il codice HTML generato da HANDLEBARS
        $('.cards-container').append(card);

    } // end for
}