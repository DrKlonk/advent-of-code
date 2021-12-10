const inputFile = require("../day 10/input.js")

const parsedInput = inputFile.input.split("\n").map((line) => line.trim())

function solution1(input) {
  return input.reduce((totalScore, row) => {
    return totalScore + determineScore(row)
  }, 0)
}

function solution2(input) {
  const sortedScores = input
    .map((row) => getScore(determineRemainingOpenQueue(row)))
    .filter((score) => score != [])
    .sort((a, b) => a - b)
  return sortedScores[Math.floor(sortedScores.length / 2)]
}

function getScore(openQueue) {
  return openQueue.reduce((score, char) => {
    let charScore
    if (char == "(") {
      charScore = 1
    }
    if (char == "[") {
      charScore = 2
    }
    if (char == "{") {
      charScore = 3
    }
    if (char == "<") {
      charScore = 4
    }
    return score * 5 + charScore
  }, 0)
}

function determineRemainingOpenQueue(string) {
  const openers = ["{", "[", "(", "<"]
  const closers = ["}", "]", ")", ">"]
  let openQueue = []

  for (const char of string) {
    if (openers.includes(char)) {
      openQueue.push(char)
      // console.log("push", char, openQueue)
      continue
    } else {
      const recentOpen = openQueue.pop()
      const openerShouldBe = openers[closers.indexOf(char)]
      if (recentOpen !== openerShouldBe) {
        // console.log("wrong", char)
        return []
      }
    }
  }
  return openQueue.reverse()
}

function determineScore(string) {
  // console.log(string)
  const openers = ["{", "[", "(", "<"]
  const closers = ["}", "]", ")", ">"]
  let openQueue = []

  for (const char of string) {
    if (openers.includes(char)) {
      openQueue.push(char)
      // console.log("push", char, openQueue)
      continue
    } else {
      const recentOpen = openQueue.pop()
      const openerShouldBe = openers[closers.indexOf(char)]
      if (recentOpen !== openerShouldBe) {
        // console.log("wrong", char)
        return scoreForChar(char)
      }
    }
  }
  // console.log("line is okish")
  return 0
}

function scoreForChar(char) {
  if (char == ")") {
    return 3
  }
  if (char == "]") {
    return 57
  }
  if (char == "}") {
    return 1197
  }
  if (char == ">") {
    return 25137
  }
}

console.log(solution2(parsedInput))
