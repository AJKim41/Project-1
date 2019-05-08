$(function() {
  var params = {
    // Request parameters
    showStats: "true"
  };

  document.addEventListener("submit", function(event) {
    event.preventDefault();
    //-------------------------------  Sentiment API -----------------
    $("#formsubmission").addClass("off");
    $("#results1").removeClass("off");

    var lang = document.getElementById("language").value;
    var id = document.getElementById("id").value;
    var userInput = document.querySelector("#userInput").value;
    var keyPhrase = document.getElementById("keyPhrases").value;
    var userData = JSON.stringify({ language: lang, id: id, text: userInput });
    console.log(userData);

    $.ajax({
      url:
        "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" +
        $.param(params),
      beforeSend: function(xhrObj) {
        // Request headers
        xhrObj.setRequestHeader("Content-Type", "application/json");
        xhrObj.setRequestHeader(
          "Ocp-Apim-Subscription-Key",
          "3364c9dcb16e43e4968abb2e69a607d3"
        );
      },
      type: "POST",
      // Request body
      data: `{ "documents": [${userData}] }`
    })
      .then(function(response) {
        var data = response;
        var score = Math.floor(data.documents[0].score * 100);
        console.log(data);
        console.log(score);
        $("#per-score").html(`${score}%`);

        $(".happy-frame").removeClass("active");
        $(".thinking-frame").removeClass("active");
        $(".sad-frame").removeClass("active");
        if (score >= 66) {
          $(".happy-frame").addClass("active");
        } else if (score >= 33 && score <= 65) {
          $(".thinking-frame").addClass("active");
        } else {
          $(".sad-frame").addClass("active");
        }
      })
      .done(function(data) {
        console.log("success");
      })
      .fail(function() {
        console.log("error");
      });

    //-------------------------------  KeyPhrase API -----------------
    var userData = JSON.stringify({
      id: id,
      keyPhrases: keyPhrase,
      text: userInput
    });
    console.log(userData);

    $.ajax({
      url:
        "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases?" +
        $.param(params),
      beforeSend: function(xhrObj) {
        // Request headers
        xhrObj.setRequestHeader("Content-Type", "application/json");
        xhrObj.setRequestHeader(
          "Ocp-Apim-Subscription-Key",
          "470a6111df1b4b0a97d04a476803f88c"
        );
      },
      type: "POST",
      // Request body
      data: `{ "documents": [${userData}] }`
    })
      .then(function(response) {
        var data = response;
        console.log(data);
        console.log(data.documents[0].keyPhrases[0]);
        var keyPhrase = data.documents[0].keyPhrases[0];
        console.log(data);
        if (keyPhrase === undefined) {
          $("#key-phrase").html("No Key Phrase");
        } else {
          $("#key-phrase").html(data.documents[0].keyPhrases[0]);

          websterAW(keyPhrase);
        }
      })
      .done(function(data) {
        // alert("success");
      })
      .then(function(response) {
        var data = response;

        console.log(data.documents[0].keyPhrases);
        $(".keyphrase").html(data.documents[0].keyPhrases);
      })
      .done(function(data) {
        console.log("success");
      })
      .fail(function() {
        console.log("error");
      });
    $("#userInput").val("");
    $("#searchForm").removeClass("col-md-12");
    $("#searchForm").addClass("col-md-6");
    $("#information").attr("style", "display:block");
    console.log(keyPhrase);
  });

  async function websterAW(keyPhrase) {
    let url = await fetch(
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${keyPhrase}?key=890e17a2-5dcf-4fbe-9e78-69195869c5a2`
    );
    let data = await url.json();
    console.log(data);
    $("#key-phrase").html(`${keyPhrase}`);

    $("#key-phrase-meaning").html(`${data[0].shortdef}`);
  }
});
