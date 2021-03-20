const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
let letterFound = [];

const songTitles = [
    'Phantom of the Opera',
    'Purgatory',
    'Hallowed Be Thy Name',
    'Die with Your Boots On',
    'Rime of the Ancient Mariner',
    'Alexander the Great',
    'The Evil That Men Do',
    'Bring Your Daughter to the Slaughter',
    'Afraid to Shoot Strangers',
    'Sign of the Cross',
    'The Clansman',
    'The Thin Line Between Love and Hate',
    'Dance of Death',
    'The Longest Day',
    'Isle of Avalon',
    'The Book of Souls'
]

let startOver = document.createElement('button')
startOver.textContent = 'Play again?'
overlay.appendChild(startOver);
overlay.lastElementChild.textContent = "Play again?";
overlay.lastElementChild.style.display = 'none';

function getRandomSongTitle(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    const songStr = arr[rand];
    const songArr = []
    for ( let i = 0; i < songStr.length; i++) {
        songArr.push(songStr[i]);
    }
    return songArr;
}

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});


function addPhraseToDisplay(arr) {
    for ( let i = 0; i < arr.length; i++ ) {
        const listUl = document.getElementById('phrase').firstElementChild;
        const li = document.createElement('li');
        li.textContent = arr[i];
        if ( li.textContent == " " ) {
            li.className = ('space');
            listUl.appendChild(li);
        } else  {
            li.className = ('letter');
            listUl.appendChild(li);
        }
    }
}

function checkLetter(button) {
    const letters = document.querySelectorAll('.letter');
    let correctLetter = '';
    for ( let i = 0; i < letters.length; i++ ) {
        if ( button.textContent === letters[i].textContent.toLowerCase() ) {
            letters[i].className = 'letter show'
            correctLetter = letters[i].textContent;
        };
    } if ( correctLetter === '') {
        return null;
    } else {
        return correctLetter;
    }
}

function reset() {
    missed = 0;
    let li = document.querySelectorAll('li');
    for ( let i = 0; i < li.length; i++) {
        li[i].remove();
    }
    let buttons = document.querySelectorAll('.chosen');
    for ( let i = 0; i < buttons.length; i++ ) {
        buttons[i].className = '';
    }
    for ( let i = 0; i < 5; i++ ) {
       let ol = document.getElementsByTagName('ol')[0];
       let heart = document.createElement('li');
       heart.className = 'tries';
       let img = document.createElement('img');
       img.src = "images/liveHeart.png";
       img.style.height = "35px"
       img.style.width = "30px"
       heart.appendChild(img);
       ol.appendChild(heart)
    }
    song = getRandomSongTitle(songTitles);
    addPhraseToDisplay(song);
    overlay.style.display = 'none';
}

function checkWin(misses) {
    if ( misses >= 5 ) {
        overlay.className = ('lose');
        overlay.style.display = 'block';
        overlay.firstElementChild.textContent = "You lose!";
        document.querySelector('.btn__reset').style.display = 'none';
        overlay.lastElementChild.style.display = '';
        startOver.addEventListener('click', () => {
            reset();
        })
    } else if ( document.querySelectorAll('.letter').length == document.querySelectorAll('.show').length ) {
        overlay.className = ('win');
        overlay.style.display = 'block';
        overlay.firstElementChild.textContent = "You win!";
        document.querySelector('.btn__reset').style.display = 'none';
        overlay.lastElementChild.style.display = '';
        startOver.addEventListener('click', () => {
            reset();
    })
}}

keyboard.addEventListener('click', (e) => {
    if ( e.target.tagName === 'BUTTON' ) {
        if ( e.target.className === 'chosen') {
            alert('That letter has been picked already')
        } else {
        letterFound = checkLetter(e.target);
        e.target.className = 'chosen';
        if ( !checkLetter(e.target) ) {
            missed++;
            document.querySelectorAll('.tries')[0].remove();
            }
        }   
    }
    checkWin(missed);
});

let song = getRandomSongTitle(songTitles);
addPhraseToDisplay(song);