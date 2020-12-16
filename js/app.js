const startBtn = document.querySelector('.btn__reset');
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const title = document.querySelector('.title');
const ul = phrase.getElementsByTagName("ul")[0];
let missed = 0;
// Phrases
const phrases= [
    'Break Even', 'Cry Me a River', "Sugar and Spice", "Take a Gander", "Move Out", "Home Alone", "Hustle and Bustle", "No harm No foul"
];
// Starts the Game
// Hides Overlay
startBtn.addEventListener("click", (e) => {
    addPhraseToDisplay(phrases);
    overlay.style.display = 'none';
});
// Choose random phrase
function getRandomPhraseArray(array) {
    let index = Math.floor(Math.random() * phrases.length);
    let phrase = array[index].toUpperCase();
    let letters = phrase.split("");
    return letters;
}
//Adds phrase to the display
function addPhraseToDisplay(array) {
    let letters = getRandomPhraseArray(array);
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        let li = document.createElement('li');
        li.className = "letter";
        li.textContent = letter;
        if (li.textContent === " ") {
            li.className = "space";
        }
        ul.appendChild(li);
    }
    return letters;
}
// Checks Letter in the phrase
function checkLetter(pressedBtn, array){
    let letter = null;
    for(let i =0; i<array.length; i++) {
        if(pressedBtn.textContent === array[i].textContent.toLowerCase()) {
            letter = array[i].textContent.toLowerCase();
            array[i].classList.add("show");
        }
        pressedBtn.classList.add("chosen");
        pressedBtn.setAttribute("disabled", true);
    }
    return letter;
}
//Guesses Letter
qwerty.addEventListener('click', (e) => {
    let letterFound;
    if(e.target.tagName == 'BUTTON') {
    let pressedBtn = e.target;
    let li = ul.children;
    let letters = [];
    for (let i = 0; i<li.length;i++) {
        if(li[i].className === "letter") {
            letters.push(li[i]);
        }
    }
    letterFound = checkLetter(pressedBtn, letters);
        if (letterFound === null) {
            let ol = document.querySelector('ol');
            let tries = ol.getElementsByTagName('img');
            tries[missed].setAttribute('src', 'images/lostHeart.png');
            missed++;
        } 
        }
    checkWin();
});
// Check if won
function checkWin () {
    let show = document.getElementsByClassName('show');
    let letters = document.getElementsByClassName('letter');
    startBtn.textContent = "New Game";
    if(show.length === letters.length) {
        title.textContent = "Congrats!!! You are Amazing!";
        overlay.className = 'win';
        setTimeout(() => {
            overlay.style.display = "";
            clearAll();
        }, 100);
    }   else if (missed > 4) {
            let fullPhrase = [];
            const phraseChars = document.querySelectorAll('#phrase ul li');
            phraseChars.forEach(char => fullPhrase.push(char.textContent));
            clearAll();
            overlay.className = 'lose';
            overlay.style.display = "";
            title.textContent = "HAHA You Lost!!! Wanna give it another shot?";
    }
}
//Resets Game
//Reset Phrase
function resetPhrase() {
    let phraseUl = document.querySelector('ul');
    phraseUl.innerHTML ="";
}
//Reset Hearts
function resetLives() {
    let ol = document.querySelector('ol');
    let tries = ol.querySelectorAll('img');
    for(let i =0; i<tries.length; i++) {
        tries[i].setAttribute('src', 'images/liveHeart.png')
    }
}
//Reset Keybooard
function resetKeyboard() {
    let qwertyKey = document.querySelectorAll('.chosen');
    for( let i = 0; i< qwertyKey.length; i++) {
        qwertyKey[i].removeAttribute('disabled');
        qwertyKey[i].classList.remove('chosen');
    }
}
//Resets Entire Game
function clearAll() {
    missed = 0;
    resetPhrase();
    resetLives();
    resetKeyboard();
}