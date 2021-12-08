const inputFile = require("./input.js")

const parsedInput = inputFile.input.split("\n")

const bingoNumbers = parsedInput.shift().split(",")

const bingoCards = []

const cardsWon = new Set()

let scoreCards

function fillBingoCards() {
  for (let i = 0; i < parsedInput.length; i += 6) {
    const bingoCard = []
    for (let j = 1; j < 6; j++) {
      bingoCard.push(
        parsedInput[i + j].split(/[ ]+/).filter((num) => num !== "")
      )
    }
    bingoCards.push(bingoCard)
  }

  // Create scorecards
  scoreCards = bingoCards.map((card) => [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ])
}

fillBingoCards()

playBingo(bingoNumbers)

function playBingo(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    crossNumber(numbers[i])
  }
}

function crossNumber(number) {
  for (let i = 0; i < bingoCards.length; i++) {
    const card = bingoCards[i]

    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (card[j][k] === number) {
          // console.log(i, j, k, card, scoreCards[i], number)
          scoreCards[i][j][k] = true
          if (
            !cardsWon.has(i) &&
            (checkRow(scoreCards[i][j]) || checkColumn(scoreCards[i], k))
          ) {
            calcScore(i, number)
          }
        }
      }
    }
  }
}

function checkRow(row) {
  return row.every((number) => number)
}

function checkColumn(card, col) {
  return card.map((row) => row[col]).every((number) => number)
}

function calcScore(index, drawnNumber) {
  cardsWon.add(index)
  let cardSum = 0
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (!scoreCards[index][i][j]) {
        cardSum += +bingoCards[index][i][j]
      }
    }
  }
  console.log(cardsWon.size, index, bingoCards.length)
  if (cardsWon.size === bingoCards.length) {
    console.log("finished!", index, cardSum, drawnNumber, cardSum * drawnNumber)
  }
}
