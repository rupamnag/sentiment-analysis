const analyzeBtn = document.querySelector("#analyze-btn");
const result = document.querySelector("#result");
const resultText = document.querySelector("#result-text");
const resultSentiment = document.querySelector("#result-sentiment");
const resultPolarity = document.querySelector("#result-polarity");
const resultSubjectivity = document.querySelector("#result-subjectivity");
analyzeBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const text = document.querySelector("#text").value;

  fetch("https://api.meaningcloud.com/sentiment-2.1", {
    method: "POST",
    body: new URLSearchParams({
      key: "19b9226a4e72d0eedcfcca92628545f8",
      lang: "en",
      txt: text,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      result.style.display = "block";
      resultText.textContent = text;

      switch (data.score_tag) {
        case "P+":
          resultSentiment.textContent = "Strong Positive 😍";
          break;
        case "P":
          resultSentiment.textContent = "Positive 🙂";
          break;
        case "NEU":
          resultSentiment.textContent = "Neutral 😐";
          break;
        case "N":
          resultSentiment.textContent = "Negative 🙁";
          break;
        case "N+":
          resultSentiment.textContent = "Strong Negative 😡";
          break;
        default:
          resultSentiment.textContent = "No sentiment detected 😶";
      }
      resultPolarity.textContent = data.agreement;
      resultSubjectivity.textContent = data.subjectivity;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
