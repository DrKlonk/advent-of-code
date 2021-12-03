const inputFile = require("./input.js")

const parsedInput = inputFile.input.split("\n")

function calcGammaAndEpsilon(input) {
  const binaryLength = input[0].length
  const onesPerIndex = input.reduce((acc, curr, index) => {
    for (let i = 0; i < curr.length; i++) {
      if (curr[i] === "1") {
        acc[i]++
      }
    }
    return acc
  }, new Array(binaryLength).fill(0))

  const neededOnes = input.length / 2

  return onesPerIndex.reduce(
    (acc, curr) => {
      if (curr > neededOnes) {
        acc.gammaRate = acc.gammaRate.concat("1")
        acc.epsilonRate = acc.epsilonRate.concat("0")
      } else {
        acc.gammaRate = acc.gammaRate.concat("0")
        acc.epsilonRate = acc.epsilonRate.concat("1")
      }
      return acc
    },
    {
      gammaRate: "",
      epsilonRate: "",
    }
  )
}

function calcPowerConsumption(gammaAndEpsilon) {
  return (
    parseInt(gammaAndEpsilon.gammaRate, 2) *
    parseInt(gammaAndEpsilon.epsilonRate, 2)
  )
}

function findMatchingString(input, index, type) {
  const oneOrZero = calcOneOrZero(input, index, type)

  const filteredInput = input.filter((string) => string[index] === oneOrZero)

  if (filteredInput.length == 2) {
    console.log("We have to decide between these two: ", filteredInput)
    const tiebreaker = type === "oxygen" ? "1" : "0"

    console.log("The tiebreaker is: ", tiebreaker)
    console.log("We are checking index: ", index + 1)
    console.log(
      "Result: ",
      filteredInput.filter((string) => string[index + 1] === tiebreaker)[0]
    )
    return filteredInput.filter((string) => string[index + 1] === tiebreaker)[0]
  }
  if (filteredInput.length == 1) {
    console.log("This is the only one left: ", filteredInput)
    return filteredInput[0]
  }

  return findMatchingString(filteredInput, index + 1, type)
}

function calcOneOrZero(input, index, tiebreaker) {
  const noOfOnes = input.filter((string) => string[index] == "1").length

  console.log(
    `Determining how many ones are on index ${index}.
    The result is ${noOfOnes}.
    There are ${input.length} values
    This is half the input: ${input.length / 2}`
  )
  if (tiebreaker == "oxygen") {
    const result = noOfOnes >= input.length / 2 ? "1" : "0"
    console.log(`We are checking for a ${result}`)
    return result
  }
  if (tiebreaker == "co2") {
    const result = noOfOnes < input.length / 2 ? "1" : "0"
    console.log(`We are checking for a ${result}`)
    return result
  }
}

const oxygen = parseInt(findMatchingString(parsedInput, 0, "oxygen"), 2)
const co2scrubbing = parseInt(findMatchingString(parsedInput, 0, "co2"), 2)

console.log(oxygen, co2scrubbing, oxygen * co2scrubbing)
