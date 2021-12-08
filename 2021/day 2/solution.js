const inputFile = require("./input.js")

const parsedInput = inputFile.input.split("\n")

function calcPositionAndDepth(input) {
  const result = input.reduce(
    (acc, curr) => {
      const [direction, value] = curr.split(" ")
      if (direction == "forward") {
        acc.position += +value
      }
      if (direction == "down") {
        acc.depth += +value
      }
      if (direction == "up") {
        acc.depth -= +value
      }
      return acc
    },
    {
      position: 0,
      depth: 0,
    }
  )
  return result.position * result.depth
}

function calcPositionAndDepthWithAim(input) {
  let aim = 0
  const result = input.reduce(
    (acc, curr) => {
      const [direction, value] = curr.split(" ")
      if (direction == "forward") {
        acc.position += +value
        acc.depth += +value * aim
      }
      if (direction == "down") {
        aim += +value
      }
      if (direction == "up") {
        aim -= +value
      }
      return acc
    },
    {
      position: 0,
      depth: 0,
    }
  )
  return result.position * result.depth
}

console.log(calcPositionAndDepthWithAim(parsedInput))
