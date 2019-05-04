$(function() {
  var params = {
    // Request parameters
    showStats: "true"
  };

  document.addEventListener("submit", function(event) {
    event.preventDefault();
    var lang = document.getElementById("language").value;
    var id = document.getElementById("id").value;
    var userInput = document.querySelector("#userInput").value;
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
        $(".sentiment_score").html(`${score}%`);
      })
      .done(function(data) {
        alert("success");
      })
      .fail(function() {
        alert("error");
      });
  });
});

// This is the key phrase API //

document.addEventListener("submit", function(event) {
  event.preventDefault();
  var id = document.getElementById("id").value;
  var keyPhrase = document.getElementById("keyPhrases").value;
  var userInput = document.querySelector("#userInput").value;
  var userData = JSON.stringify({
    id: id,
    keyPhrases: keyPhrases,
    text: userInput
  });
  console.log(userData);
  $(function() {
    var params = {
      // Request parameters
      showStats: true
    };

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
        console.log(data.documents[0].keyPhrases);
        $(".keyphrase").html(data.documents[0].keyPhrases);
      })
      .done(function(data) {
        alert("success");
      })
      .fail(function() {
        alert("error");
      });
  });

  // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });

  // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  // try {
  //   let app = firebase.app();
  //   let features = ["auth", "database", "messaging", "storage"].filter(
  //     feature => typeof app[feature] === "function"
  //   );
  //   document.getElementById(
  //     "load"
  //   ).innerHTML = `Firebase SDK loaded with ${features.join(", ")}`;
  // } catch (e) {
  //   console.error(e);
  //   document.getElementById("load").innerHTML =
  //     "Error loading the Firebase SDK, check the console.";
  // }
  // // });
});
