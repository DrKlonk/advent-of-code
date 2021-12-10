const inputFile = require("../day 9/input.js")

const parsedInput = inputFile.input.split("\n")

function solution1(input) {
  return input.reduce((score, row, rowIndex) => {
    for (const [colIndex, number] of row.split("").entries()) {
      if (isLowPoint(input, rowIndex, colIndex)) {
        score += +number + 1
      }
    }
    return score
  }, 0)
}

function isLowPoint(input, row, col) {
  const number = input[row][col]
  if (row - 1 >= 0 && !(input[row - 1][col] > number)) {
    return false
  }
  if (row + 1 < input.length && !(input[row + 1][col] > number)) {
    return false
  }
  if (col - 1 >= 0 && !(input[row][col - 1] > number)) {
    return false
  }
  if (col + 1 < input[row].length && !(input[row][col + 1] > number)) {
    return false
  }

  return true
}

console.log(solution1(parsedInput))
