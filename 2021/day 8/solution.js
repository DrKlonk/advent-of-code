const inputFile = require("./input.js")

const parsedInput = inputFile.input.split("\n").map((row) => {
  const [signalPatterns, output] = row.split(" | ")
  return {
    signalPatterns: signalPatterns.split(" "),
    output: output.split(" "),
  }
})

function solution1(input) {
  const goodLengths = [2, 4, 3, 7]
  return input.reduce((acc, curr) => {
    acc += curr.output.filter((string) =>
      goodLengths.includes(string.length)
    ).length
    return acc
  }, 0)
}

function solution2(input) {
  let sum = 0
  for (const inputRow of input) {
    const { signalPatterns, output } = inputRow
    const lookup = determineCorrectNumbersForString(signalPatterns)

    const result = output.reduce((acc, curr) => {
      const index = lookup.indexOf(curr.split("").sort().join(""))
      acc += "" + index

      return acc
    }, "")

    sum += +result
  }

  return sum
}

function determineCorrectNumbersForString(signalPatterns) {
  const solution = new Array(10).fill(null)
  solution[1] = signalPatterns.find((sp) => sp.length == 2)
  solution[4] = signalPatterns.find((sp) => sp.length == 4)
  solution[7] = signalPatterns.find((sp) => sp.length == 3)
  solution[8] = signalPatterns.find((sp) => sp.length == 7)
  solution[9] = signalPatterns.find(
    (sp) =>
      sp.length == 6 &&
      solution[4].split("").every((char) => sp.includes(char)) &&
      solution[7].split("").every((char) => sp.includes(char))
  )
  solution[2] = signalPatterns.find(
    (sp) =>
      sp.length == 5 && sp.split("").find((char) => !solution[9].includes(char))
  )
  solution[3] = signalPatterns.find(
    (sp) =>
      sp.length == 5 &&
      [...sp] != [...solution[9]] &&
      solution[7].split("").every((char) => sp.includes(char))
  )
  solution[5] = signalPatterns.find(
    (sp) => sp.length == 5 && sp != solution[3] && sp != solution[2]
  )
  solution[6] = signalPatterns.find(
    (sp) =>
      sp.length == 6 &&
      sp != solution[9] &&
      solution[5].split("").every((char) => sp.split("").includes(char))
  )
  solution[0] = signalPatterns.find(
    (sp) => sp.length == 6 && sp != solution[9] && sp != solution[6]
  )

  return solution.map((res) => res.split("").sort().join(""))
}

console.log(solution2(parsedInput))
