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
            alert("ERRORE! non sono riuscito a recuperare i dati...");
        }
    });

    // BONUS - permettere selezione del genere della music card

    // ascolto evento .change sul tag 'select' per intercettare la selezione dell'utente
    $('#card-genre').change(function() {

        // mi salvo il genere selezionato dall'utente
        var genreSelected = $('#card-genre').val();

        // parto sempre da una situazione in cui tutte le card non sono visibili
        $('.card').fadeOut();

        // scorro tutte le card con un ciclo 'each'
        $('.card').each(function() {

            // uso  l'attributo data-genre per individuare le card che vuole l'utente
            if (($(this).attr("data-genre").toLowerCase() == genreSelected.toLowerCase()) ||
                (genreSelected.toLowerCase() == "all")) {

                // rendo visibile le card selezionate dall'utente
                $(this).fadeIn();
            }

        }); // end each

    }); // end function

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

        // chiamo la funzione generata da HANDLEBARS per popolare il template
        // passo alla funzione l'oggetto che contiene i valori che andranno a sostituire i placeholder,
        var card = cardFunction(context);
        console.log("card popolata:", card);

        // aggiungo nella mia pagina il codice HTML generato da HANDLEBARS
        $('.cards-container').append(card);

    } // end for
}