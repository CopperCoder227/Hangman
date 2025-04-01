const wordlist= [
'lymphangioleiomyomatosis',
'disestablishmentarianism',
'defenestration',
'pneumonoultramicroscopicsilicovolcanoconiosis',
'antidisestablishmentarianism',
'istles',
'hangman',
'random',
'even',
'lost', 
'the',
'meow',
'tax',
]


//setting ame Variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level){
    selectedWord = getRandomWord(level)
    
    // Update Difficulty selection bax
    updateDifficultyDisplay(level)

    //create placeholder for the selected word
    displayedWord = '_'.repeat(selectedWord.length)
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')






    // hide difficulty selection and show game area
    document.getElementById("dificultySelection").classList.add('d-none')

    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.remove('d-none')

    document.getElementById('gameArea').classList.add('d-block')
    document.getElementById('difficultyBox').classList.add('d-block')

}

function getRandomWord(level){
    let filteredWords = wordlist.filter( word => {
        if (level === 'Hard') return word.length <= 4 //change the 4 so its longer and change the words shorter than 4
        if (level === 'Insane') return word.length >= 5 && word.length <= 7
        if (level === 'Imposable') return word.length >= 8
    })

    return filteredWords[ Math.floor(Math.random() * filteredWords.length)]

}

function updateDifficultyDisplay(level){
    let difficultyBox = document.getElementById('difficultyBox')

    //remove previously difficulty bux
    difficultyBox.classList.remove('Hard','Insane','Imposable')

    difficultyBox.textContent = `${level.charAt(0).toUpperCase() + level.slice(1)}`

    //Apply CSS style
    difficultyBox.classList.add(level)
}

function guessLetter(){
    let inputField = document.getElementById('letterInput')         //get input field
    let guessedLetter = inputField.value.toLowerCase()             //convert to lower case

    //check if input is valad between lowercase A-Z
    if(!guessedLetter.match(/^[a-z]$/)){
        alert('Please enter a letter between a-z')
        inputField.value = ''                                       //clear input field
        return                                                     //exit function
    }

    //check if lettre was already guessed
    if(guessedLetters.includes(guessedLetter)){
        alert('You already tried this letter! Put another letter you have yet to try!')
        inputField.value = ''                                       //clear input field
        return                                                     //exit function
    } else{
        //store guessed letter in guessedLetter]
        guessedLetters.push(guessedLetter)
    }


    if(selectedWord.includes(guessedLetter)){
        correctGuess(guessedLetter)
    } else {
        wrongGuess(guessedLetter)
    }

    inputField.value = ''                                       //clear input field
    inputField.focus()                                         // refocuses input feild for next guess

}

function wrongGuess(guessedLetter){
    //sound
    sound("sound/wrong.wav")

    //increment # of wrong guessed
    wrongGuesses++

    //add the guessed letter to the guessed letters display
    document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`

    //document.getElementById('shamrock').src = `imgs/shamrock${6 - wrongGuesses}.jpg`

    //check to see if the # of wrong guesses is equal to the maxMistakes if i is then call endgame(false)
    if(wrongGuesses === maxMistakes){
        endGame(false)}

}

function correctGuess(guessedLetter){
    //sound
    sound("sound/right.wav")


   let newDisplayWord = '' 

   for (let i = 0; i < selectedWord.length; i++){
    if (selectedWord[i] === guessedLetter){
        newDisplayWord += guessedLetter
    } else {
        newDisplayWord += displayedWord[i]
    }
  }

    displayedWord = newDisplayWord 
    document.getElementById('wordDisplay').textContent = displayedWord
    .split('')
    .join(' ')

    if(!displayedWord.includes('_')){
        endGame(true)
    }
}

function endGame(won) {
    if (won === true) {
        // Change the content of the game area to show a win message
        setTimeout(() => {
            sound("sound/complete.wav")
            document.getElementById('gameArea').innerHTML = `
                <div style="text-align: center; font-size: 24px; font-weight: bold;">
                    Congrats! You beat Inpossa-man!<br>
                    <button onclick="restartGame()" class="btn difficulty-btn Ez">
                        Play Again
                    </button>
                </div>
            `;
        }, 100);
    } else {
        // Change the content of the game area to show a loss message
        setTimeout(() => {
            sound("sound/incomplete.wav")
            document.getElementById('gameArea').innerHTML = `
                <div style="text-align: center; font-size: 24px; font-weight: bold;">
                    You lost to Inpossa-man!<br>
                    <button onclick="restartGame()" class="btn difficulty-btn Ez">
                        Try Again?
                    </button>
                </div>
            `;
        }, 100);
    }
}


function restartGame(){
    location.reload()
}


// enter btn
document.getElementById('letterInput').addEventListener('keydown', function(event) {
    // If Enter key (key code 13 or 'Enter') is pressed, call guessLetter
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default action (like form submission)
      guessLetter(); // Trigger guessLetter function
    }
  });


  function sound(url){
    let audio = new Audio(url)
    audio.play()
}