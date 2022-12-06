export function fetchData() {
  const inputText = document.querySelector("input").value;
  const resultBox = document.querySelector(".result-box");

  let i = 0;
  let j = 0;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputText}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayResult();

      function displayResult() {
        resultBox.innerHTML = `<div class="wordWrapper">
            <p class="word">${data[0].word}</p>
            <p class="phoneticText">${data[0].phonetics[0].text}</p>
        </div>

        <div class="meaningWrapper">
            <p class="type">${data[0].meanings[i].partOfSpeech}</p>
            <button class="type-btn"> >> </button>
        </div>

        <div class="definitionWrapper">
          <div class="phraseWrapper">
            <p class="definition"><i>Definition</i>
            ${data[0].meanings[i].definitions[j].definition}</p>
            <p class="example"><i>Example</i>
            ${data[0].meanings[i].definitions[j].example}</p>
          </div>
            <button class="definition-btn"> >> </button>
        </div>`;
        const typeBtn = document.querySelector(".type-btn");
        const definitionBtn = document.querySelector(".definition-btn");
        typeBtn.addEventListener("click", nextMeaning);
        definitionBtn.addEventListener("click", nextDefinition);
      }

      function nextMeaning() {
        if (i < data[0].meanings.length - 1) {
          i++;
          j = 0;
        } else i = 0;
        displayResult();
      }

      function nextDefinition() {
        if (j < data[0].meanings[i].definitions.length - 1) {
          j++;
        } else j = 0;
        displayResult();
      }
    })
    .catch(() => {
      resultBox.innerHTML = `<p class="error">Could not find this word!</p>`;
    });
}