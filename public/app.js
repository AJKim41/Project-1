$(function () {
  var params = {
    // Request parameters
    showStats: "true"
  };

  document.addEventListener("submit", function (event) {
    event.preventDefault();
    //-------------------------------  Sentiment API -----------------
    $("#formsubmission").addClass("off")
    $("#results1").removeClass("off")

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
      beforeSend: function (xhrObj) {
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
      .then(function (response) {
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
      .done(function (data) {
        console.log("success");
      })
      .fail(function () {
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
      beforeSend: function (xhrObj) {
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
      .then(function (response) {
        var data = response;
        console.log(data);
        console.log(data.documents[0].keyPhrases[0]);
        var keyPhrase = data.documents[0].keyPhrases[0];
        console.log(data);
        if (keyPhrase === undefined) {
          $("#key-phrase").html("No Key Phrase")
        } else {
          $("#key-phrase").html(data.documents[0].keyPhrases[0]);

          websterAW(keyPhrase);
        }

      })
      .done(function (data) {
        // alert("success");
      })
      .then(function (response) {
        var data = response;

        console.log(data.documents[0].keyPhrases);
        $(".keyphrase").html(data.documents[0].keyPhrases);
      })
      .done(function (data) {
        console.log("success");
      })
      .fail(function () {
        console.log("error");
      });
    $('#userInput').val("");
    $('#searchForm').removeClass("col-md-12");
    $('#searchForm').addClass("col-md-6")
    $("#information").attr('style', 'display:block');
    console.log(keyPhrase)
  });

  async function websterAW(keyPhrase) {
    let url = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${keyPhrase}?key=890e17a2-5dcf-4fbe-9e78-69195869c5a2`);
    let data = await url.json();
    console.log(data);
    $("#key-phrase").html(`${keyPhrase}`);

    $("#key-phrase-meaning").html(`${data[0].shortdef}`);

  };

  /* Choose A Face
  let faceA = document.getElementById("happyFace");
  let faceB = document.getElementById("thinkingFace");
  let faceC = document.getElementById("sadFace");
  let wordScore = document.getElementById("keyS").value;


  let chosenFace = function () {
    if (wordScore >= 80) {
      chosenFace = faceA;
    } else if (wordScore <= 60) {
      chosenFace = faceC;
    } else {
      chosenFace = faceB;
    }
  };

  let displayFace = function () {
    document.getElementById("chosenFace").innerHTML($(img.val));
    console.log(chosenFace);
  }
  chooseFace();
  displayFace();
});
*/
  // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });

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


  // style







});

var colors = new Array(
  [228, 133, 181],
  [129, 43, 155],
  [58, 119, 233],
  [228, 133, 181],
  [129, 43, 155],
  [58, 119, 233]
);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient() {

  if ($ === undefined) return;

  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];

  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

  $('#gradient').css({
    background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
  }).css({
    background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
  });

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

  }
}

setInterval(updateGradient, 10);
