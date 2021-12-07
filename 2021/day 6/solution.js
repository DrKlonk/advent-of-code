const inputFile = require("./input.js")

const parsedInput = inputFile.input.split(",")

let scoreArr = new Array(81).fill(0).map(() => {
  return { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null }
})

function fishScore(fishValue, daysLeft) {
  if (fishValue >= daysLeft) {
    return 1
  }

  if (!scoreArr[daysLeft][fishValue]) {
    scoreArr[daysLeft][fishValue] =
      fishScore(fishValue, daysLeft - 7) + fishScore(fishValue, daysLeft - 9)
  }

  return scoreArr[daysLeft][fishValue]
}

console.log(
  parsedInput
    .map((val) => fishScore(val, 80))
    .reduce((sum, score) => sum + score, 0)
)
