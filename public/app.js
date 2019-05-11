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
        //console.log("success");
      })
      .fail(function() {
        //console.log("error");
      });

    //-------------------------------  Entities API -----------------
    var userData = JSON.stringify({ id: id, language: lang, text: userInput });
    $.ajax({
      url:
        "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/entities?" +
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

        var entities = data.documents[0].entities;
        let updatedInput = userInput;
        entities.map(({ name, wikipediaUrl }) => {
          updatedInput = updatedInput.replace(
            name,
            `<a href="${wikipediaUrl}" target="_blank">${name}</a>`
          );
        });
        console.log(entities);
        console.log(`updatedInput: `, updatedInput);
        $("#last-definition").html(
          `<h3 style="color:#fff;">"${updatedInput}"</h3>`
        );
        $("#userInput").val("");
      })
      .done(function(data) {
        //console.log("success");
      })
      .fail(function() {
        //console.log("error");
      });

    //-------------------------------  KeyPhrase API -----------------
    var userData = JSON.stringify({
      id: id,
      keyPhrases: keyPhrase,
      text: userInput
    });

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
        var keyPhrase = data.documents[0].keyPhrases[0];

        if (keyPhrase === undefined) {
          $("#key-phrase").html("No Key Phrase");
          $("#key-phrase-meaning").html("");
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

        $(".keyphrase").html(data.documents[0].keyPhrases);
      })
      .done(function(data) {
        //console.log("success");
      })
      .fail(function() {
        //console.log("error");
      });
    $("#searchForm").removeClass("col-md-12");
    $("#searchForm").addClass("col-md-6");
    $("#information").attr("style", "display:block");
  });

  async function websterAW(keyPhrase) {
    let url = await fetch(
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${keyPhrase}?key=890e17a2-5dcf-4fbe-9e78-69195869c5a2`
    );
    let data = await url.json();
    $("#key-phrase").html(`${keyPhrase}`);

    $("#key-phrase-meaning").html(`${data[0].shortdef}`);
  }

  // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  firebase.auth().onAuthStateChanged(user => {});
  firebase
    .database()
    .ref("/path/to/ref")
    .on("value", snapshot => {});
  firebase
    .messaging()
    .requestPermission()
    .then(() => {});
  firebase
    .storage()
    .ref("/path/to/ref")
    .getDownloadURL()
    .then(() => {});

  try {
    let app = firebase.app();
    let features = ["auth", "database", "messaging", "storage"].filter(
      feature => typeof app[feature] === "function"
    );
    document.getElementById(
      "load"
    ).innerHTML = `Firebase SDK loaded with ${features.join(", ")}`;
  } catch (e) {
    //console.error(e);
    document.getElementById("load").innerHTML =
      "Error loading the Firebase SDK, check the console.";
  }
});
