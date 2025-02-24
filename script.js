let dictionary;
await fetch('./data.json')
  .then(response => response.json())
  .then(data => dictionary = data)
  .catch(error => console.error('Ошибка загрузки JSON:', error));


const word = document.getElementById("word");
const nextBtn = document.getElementById("next-btn");
const input = document.getElementById("word-input");
const resetBtn = document.getElementById("reset-btn");

const reusultTable = document.getElementById("result-table");
const correctAnswersCount = document.getElementById("correct-answers-count");
const wrongAnswersCount = document.getElementById("wrong-answers-count");
const mark = document.getElementById("mark");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getCurrentWord(index) {
    const original = dictionary[index].original.toLowerCase();
    const translations = dictionary[index].translations.map(word => word.toLowerCase());
    return [original, translations];
}

function changeWord()
{
    if(currentIndex < dictionary.length)
    {
        [currentWord, currentAnswer] = getCurrentWord(currentIndex++);
        word.textContent = currentWord;
    }
    else{
        showTable();
        
    }
}

function getMark()
{
    let n = dictionary.length;
    let percent = correctAnswers * 100 / n;
    if(percent >= 95)
        return "Отлично";
    else if(percent > 80)
        return "Хорошо";
    else if(percent > 70)
        return "Удовлетворительно";
    else
        return "Плохо";
}

function showTable()
{
    reusultTable.style.display = "flex";
    correctAnswersCount.textContent = correctAnswers;
    wrongAnswersCount.textContent = dictionary.length - correctAnswers;
    mark.textContent = getMark();
}

shuffleArray(dictionary);
let currentWord; let currentAnswer; let currentIndex = 0;
let correctAnswers = 0;
changeWord();



nextBtn.addEventListener('click', () => {
    let userinput = input.value.toLowerCase().trim();
    if(currentAnswer.includes(userinput))
        correctAnswers++;
    changeWord();
    input.value = "";
    input.focus();
});

resetBtn.addEventListener('click', () => {
    shuffleArray(dictionary);
    currentIndex = 0;
    correctAnswers = 0;
    changeWord();
    reusultTable.style.display = "none";

});