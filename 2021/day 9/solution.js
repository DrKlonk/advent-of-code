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

function solution2(input) {
  const isVisited = new Array(input.length)
    .fill(0)
    .map(() => new Array(input[0].length).fill(false))

  const basins = []

  const toCheckQueue = []

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      toCheckQueue.push([i, j])
      let basinSize = 0

      while (toCheckQueue.length > 0) {
        const [row, col] = toCheckQueue.pop()

        if (isVisited[row][col] || input[row][col] == "9") {
          continue
        }
        isVisited[row][col] = true

        basinSize++
        addNeighbors(input, row, col, isVisited, toCheckQueue)
      }
      if (basinSize > 0) {
        basins.push(basinSize)
      }
    }
  }

  return basins
    .sort((a, b) => a - b)
    .splice(-3)
    .reduce((total, basin) => {
      return total * basin
    })
}

function addNeighbors(input, x, y, toBeChecked, toCheckQueue) {
  if (x > 0 && !toBeChecked[x - 1][y]) {
    toCheckQueue.push([x - 1, y])
  }
  if (x < input.length - 1 && !toBeChecked[x + 1][y]) {
    toCheckQueue.push([x + 1, y])
  }
  if (y > 0 && !toBeChecked[x][y - 1]) {
    toCheckQueue.push([x, y - 1])
  }
  if (y < input[0].length - 1 && !toBeChecked[x][y + 1]) {
    toCheckQueue.push([x, y + 1])
  }
  return toCheckQueue
}

console.log(solution2(parsedInput))
