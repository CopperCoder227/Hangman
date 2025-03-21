const wordlist= [
'Lymphangioleiomyomatosis',
'Disestablishmentarianism',
'Defenestration',
'Hyperpigmentation',
'Antidisestablishmentarianism',
'Istles',
'Female',
'random',
'Even',
'Lost',
'The',
]


//setting ame Variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const mxMistakes = 6

function startGame(level){
    selectedWord = getRandomWord(level)
    
    // Updae Dificulty selection bax
    updateDifficultyDisplay(level)

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