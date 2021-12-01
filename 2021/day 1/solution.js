const inputFile = require("./input.js")

const parsedInput = inputFile.input.split("\n").map((x) => {
  return Number.parseInt(x)
})

function countIncreases(input) {
  let previousDepth = input[0]
  return input.reduce((acc, curr) => {
    if (curr > previousDepth) {
      acc++
    }
    previousDepth = curr
    return acc
  }, 0)
}

function countSlidingWindowIncreases(input) {
  return input.reduce((acc, curr, index) => {
    if (input[index + 3] && curr < input[index + 3]) {
      acc++
    }
    return acc
  }, 0)
}

console.log(countSlidingWindowIncreases(parsedInput))
