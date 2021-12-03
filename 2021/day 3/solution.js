const inputFile = require("./input.js")

const parsedInput = inputFile.input.split("\n")
const binaryLength = parsedInput[0].length
function calcPowerConsumption(input) {
  const onesPerIndex = input.reduce((acc, curr, index) => {
    for (let i = 0; i < curr.length; i++) {
      if (curr[i] === "1") {
        acc[i]++
      }
    }
    return acc
  }, new Array(binaryLength).fill(0))

  const neededOnes = input.length / 2

  const gammaAndEpsilon = onesPerIndex.reduce(
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
  return (
    parseInt(gammaAndEpsilon.gammaRate, 2) *
    parseInt(gammaAndEpsilon.epsilonRate, 2)
  )
}

console.log(calcPowerConsumption(parsedInput))
