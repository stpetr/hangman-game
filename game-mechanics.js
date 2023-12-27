import { getRandomArrayElement } from './helpers.js'
import { words } from './words.js'

const correctLetters = []
const wrongLetters = []
let selectedWord = ''
let selectedWordLetters = []

export const getCorrectLetters = () => {
  return [...correctLetters]
}

export const getWrongLetters = () => {
  return [...wrongLetters]
}

export const getSelectedWord = () => selectedWord

export const selectWord = () => {
  correctLetters.splice(0)
  wrongLetters.splice(0)
  selectedWord = getRandomArrayElement(words)
  selectedWordLetters = selectedWord.split('')
  return selectedWord
}

export const getSelectedWordLetters = () => {
  return [...selectedWordLetters]
}

export const isLetterUsed = (letter) => {
  return correctLetters.includes(letter) || wrongLetters.includes(letter)
}

export const guessLetter = (letter) => {
  if (isLetterUsed(letter)) {
    return false
  }

  if (selectedWordLetters.includes(letter)) {
    correctLetters.push(letter)
    return true
  }

  wrongLetters.push(letter)
  return false
}

export const isPlayerWon = () => {
  return new Set(selectedWordLetters).size === correctLetters.length
}

export const isGameOver = (maxMistakes) => {
  return wrongLetters.length >= maxMistakes || isPlayerWon()
}
