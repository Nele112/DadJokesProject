//Kun käyttäjä napsauttaa "Get a joke"- painiketta, alla oleva toiminto käynnistyy
//$("#jokeBtn") tarkoittaa: etsi sivulta painike, jonka id on "jokeBtn"
$("#jokeBtn").on("click", function () {
    //Näytetään teksti "Loading a joke...", jotta käyttäjä näkee, että jotain tapahtuu
    $("#jokeResult").html("<p>Loading a joke...</p>");

    //Poistetaan edellinen nauruvideo, jotta uusi voi tulla tilalle
    $("#laugh").remove();

    //Pyyntö lähetetään omaan Netlify-palvelimeen (serverless function), joka hakee vitsin API:sta ja suojaa avaimen
    $.ajax({
        method: "GET",
        url: "/.netlify/functions/joke",
        
        success: function (result) {
            const jokes = JSON.parse(result);
            if (jokes.length > 0) {
                const joke = jokes[0].joke;

                //Piilotetaan vitsialue hetkeksi, vaihdetaan teksti ja tuodaan näkyviin fadeIn-efektillä
                $("#jokeResult").hide().html(`<p>${joke}</p>`).fadeIn();

                // Valitaan satunnainen video kahden vaihtoehdon joukosta
                const videos = ["laugh1.mp4", "laugh2.mp4"];
                const randomVideo = videos[Math.floor(Math.random() * videos.length)];

                //Luodaan videokomponentti, jossa ei ole säätimiä ja jossa ääni on päällä
                const laughVideo = $("<video>", {
                    id: "laugh",
                    src: randomVideo,
                    autoplay: true,
                    muted: false,
                    controls: false,
                    playsinline: true,
                    class: "laugh-video"
                });

                //Lisätään video vitsin alle
                $("#jokeResult").append(laughVideo);

                //Lisätään palautekysymys kahdella painikkeella
                const feedbackHtml = `
                    <div id="feedback" class= "feedback-box">
                    <p>Did it make you laugh?</p>
                    <button id="btn-yes" class="btn btn-success me-2">😂 Yes</button>
                    <button id="btn-no" class="btn btn-secondary">😐 Nah</button>
                    </div>
                `;

                $("#jokeResult").append(feedbackHtml);

                //Jos käyttäjä valitsee "Yes", näytetään positiivinen palaute
                $("#btn-yes").on("click", function () {
                    $("#feedback").html("<p class='text-success fw-bold'>Yay! Glad you liked it! 😍</p>");
                });

                //Jos käyttäjä valitsee "Nah", näytetään kannustava palaute
                $("#btn-no").on("click", function () {
                    $("#feedback").html("<p class='text-muted'>We'll try harder next time 💪</p>");
                });

                //Jos vitsejä ei löytynyt, näytetään varoitusviesti
                } else {
                    $("#jokeResult").html("<div class='alert alert-warning'>No jokes found. Try again!</div>");
                }
            },

        //Jos pyyntö epäonnistuu, näytetään virheilmoitus
        error: function () {
            $("#jokeResult").html("<div class='alert alert-danger'>Something went wrong. Please try again later.</div>");
        }
    });
});
  