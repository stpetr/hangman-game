import {
  selectWord,
  getSelectedWordLetters,
  getWrongLetters,
  getCorrectLetters,
  isLetterUsed,
  isGameOver,
  isPlayerWon,
  guessLetter, getSelectedWord,
} from './game-mechanics.js'

import './style.scss'

const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popupEl = document.getElementById('popup-container')
const notificationEl = document.getElementById('notification-container')
const finalMessageEl = document.getElementById('final-message')
const figureContainer = document.querySelector('.figure-container')
const figureParts = document.querySelectorAll('.figure-part')

const maxMistakes = figureParts.length

const displayWord = () => {
  wordEl.innerHTML = `
    ${getSelectedWordLetters()
      .map((letter) => `
        <span class="letter">
          ${getCorrectLetters().includes(letter) ? letter : ''}
        </span>
      `)
      .join('')
    }
  `
}

const updateWrongLettersEl = () => {
  const wrongLetters = getWrongLetters()

  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Неправильные буквы</p>' : ''}
    ${wrongLetters.map((el) => `<span>${el}</span>`)}
  `

  figureParts.forEach((el, index) => {
    el.style.display = wrongLetters.length > index ? 'block' : 'none'
  })
}

const showNotification = () => {
  notificationEl.classList.add('show')
  setTimeout(() => {
    notificationEl.classList.remove('show')
  }, 2000)
}

const showFinalMessage = (message) => {
  figureContainer.classList.add('animated')

  setTimeout(() => {
    finalMessageEl.innerText = message
    popupEl.style.display = 'flex'
    figureContainer.classList.remove('animated')
  }, 2000)
}

const hideFinalMessage = () => {
  popupEl.style.display = 'none'
  figureContainer.classList.remove('animated')
}

const startGame = () => {
  selectWord()
  displayWord()
}

const gameStep = (letter) => {
  if (isLetterUsed(letter)) {
    showNotification()
    return
  }

  guessLetter(letter)
  displayWord()
  updateWrongLettersEl()

  if (isGameOver(maxMistakes)) {
    let message = `К сожалению, вы проиграли. Слово было "${getSelectedWord()}"`
    if (isPlayerWon()) {
      message = 'Поздравляем! Вы выиграли!'
    }
    showFinalMessage(message)
  }
}

window.addEventListener('keydown', (e) => {
  const char = e.key
  if (!isGameOver(maxMistakes) && char.match(/[а-я]/i)) {
    gameStep(char)
  }
})

playAgainBtn.addEventListener('click', () => {
  startGame()
  updateWrongLettersEl()
  hideFinalMessage()
})

startGame()
