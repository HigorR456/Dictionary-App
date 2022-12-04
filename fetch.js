export function fetchData() {
    const inputText = document.querySelector('input').value;
    const resultBox = document.querySelector('.result-box');

    var i = 0;
    var j = 0;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputText}`)
    .then ((res) => {return res.json()})
    .then ((data) => {
        displayResult();

        const typeBtn = document.querySelector('.type-btn');
        const definitionBtn = document.querySelector('.definition-btn');
        typeBtn.addEventListener('click', nextMeaning);
        definitionBtn.addEventListener('click', nextDefinition);
      
        function displayResult() {
            resultBox.innerHTML =
        `<div class="wordWrapper">
            <p class="word">${data[0].word}</p>
            <p class="phoneticText">${data[0].phonetics[0].text}</p>
        </div>

        <div class="definitionWrapper">
            <p class="type">${data[0].meanings[i].partOfSpeech}</p>
            <button class="type-btn">Next meaning</button>
            <p class="definition">${data[0].meanings[i].definitions[j].definition}</p>
            <p class="example">${data[0].meanings[i].definitions[j].example}</p>
            <button class="definition-btn">Next definition</button>
        </div>`}

        function nextMeaning() {
            if (i < (data[0].meanings.length - 1)) {
            i++;
            j = 0;
            } else i = 0;
            displayResult();
            const typeBtn = document.querySelector('.type-btn');
            const definitionBtn = document.querySelector('.definition-btn');
            typeBtn.addEventListener('click', nextMeaning);
            definitionBtn.addEventListener('click', nextDefinition);
            console.log(i);
            console.log(j);
        }

        function nextDefinition() {
            if (j < (data[0].meanings[i].definitions.length - 1)) {
            j++;
            } else j = 0;
            displayResult();
            const typeBtn = document.querySelector('.type-btn');
            const definitionBtn = document.querySelector('.definition-btn');
            typeBtn.addEventListener('click', nextMeaning);
            definitionBtn.addEventListener('click', nextDefinition);
            console.log(i);
            console.log(j);
        }
        
        console.log(data[0].word)
        console.log(data[0].phonetics[0].text)
        console.log(data[0].phonetics[0].audio)

        console.log(data[0].meanings[0].partOfSpeech)
        console.log(data[0].meanings[0].definitions[0].definition)
        console.log(data[0].meanings[0].definitions[0].example)

        console.log(data)
    })
    .catch(() => {
        resultBox.innerHTML = 'Could not find this word!';
    });
    
}