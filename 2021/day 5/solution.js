const inputFile = require("./input.js")

const parsedInput = inputFile.input.split("\n").map((line) => {
  const [from, to] = line.split(" -> ")
  const [fromX, fromY] = from.split(",")
  const [toX, toY] = to.split(",")

  return {
    from: {
      x: +fromX,
      y: +fromY,
    },
    to: {
      x: +toX,
      y: +toY,
    },
  }
})

function findHighestValue(input) {
  return input.reduce((highestValue, curr) => {
    if (curr.from.x > highestValue) {
      highestValue = curr.from.x
    }
    if (curr.to.x > highestValue) {
      highestValue = curr.to.x
    }
    if (curr.from.y > highestValue) {
      highestValue = curr.from.y
    }
    if (curr.to.y > highestValue) {
      highestValue = curr.to.y
    }
    return highestValue
  }, 0)
}

function initCloud(input) {
  const arraySize = findHighestValue(input) + 1

  return new Array(arraySize).fill(0).map(() => new Array(arraySize).fill(0))
}

function fillCloud(input, cloud) {
  for (const line of input) {
    const { from, to } = line
    // console.log(cloud, line, from, to)
    if (from.x === to.x) {
      // This line is vertical
      if (from.y < to.y) {
        for (let index = from.y; index <= to.y; index++) {
          cloud[from.x][index]++
        }
      } else {
        for (let index = to.y; index <= from.y; index++) {
          cloud[from.x][index]++
        }
      }
    } else if (from.y === to.y) {
      // This line is horizontal
      if (from.x < to.x) {
        for (let index = from.x; index <= to.x; index++) {
          cloud[index][from.y]++
        }
      } else {
        for (let index = to.x; index <= from.x; index++) {
          cloud[index][from.y]++
        }
      }
    } else {
      // This line is diagonal
      if (from.x < to.x && from.y < to.y) {
        console.log("left up right bottom")
        // left up to right bottom \ ->
        let yCoord = from.y
        for (let n = from.x; n <= to.x; n++) {
          cloud[n][yCoord]++
          yCoord++
        }
      } else if (from.x < to.x && from.y > to.y) {
        console.log("left bottom right up")
        // left bottom to right up / ->
        let yCoord = from.y
        for (let k = from.x; k <= to.x; k++) {
          cloud[k][yCoord]++
          yCoord--
        }
      } else if (from.x > to.x && from.y < to.y) {
        // right up left down / <-
        console.log("right up left down")
        let xCoord = from.x
        for (let l = from.y; l <= to.y; l++) {
          cloud[xCoord][l]++
          xCoord--
        }
      } else {
        // right down left up \ <-
        console.log("right down left up")
        let yCoord = from.y
        for (let n = from.x; n >= to.x; n--) {
          cloud[n][yCoord]++
          yCoord--
        }
      }
    }
  }
  return cloud
}

function countResult(cloud) {
  return cloud.reduce((acc, curr) => {
    return (
      acc +
      curr.reduce((rowCount, coord) => {
        if (coord >= 2) {
          rowCount++
        }
        return rowCount
      }, 0)
    )
  }, 0)
}

function solution1(input) {
  const cloud = initCloud(input)
  const filledCloud = fillCloud(input, cloud)
  return countResult(filledCloud)
}

console.log(solution1(parsedInput))
