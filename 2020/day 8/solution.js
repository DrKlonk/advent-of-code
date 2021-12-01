const operations = require('./input.js').input.split('\n')

let acc = 0

function solvePart1 (operations) {
  let index = 0
  const indices = new Set()
  // keep a global set of indices
  while (!indices.has(index)) {
    // while we have not used this index {
    indices.add(index)
    // calculate the new index based on operations[index]
    index = calcNewIndex(operations, index)
    // repeat
  }
  return acc
}

function solvePart2 (operations) {
  for (let i = 0; i < operations.length; i++) {
    const opString = operations[i]
    const operation = operations[i].split(' ')
    const instruction = operation[0]
    const value = operation[1]
    if (instruction === 'jmp') {
      operations[i] = 'nop ' + value
    }
    if (instruction === 'nop') {
      operations[i] = 'jmp ' + value
    }
    // Solve with the adapted operations array
    let index = 0
    const indices = new Set()

    acc = 0
    // We still have to check for infinite loops
    while (!indices.has(index)) {
      indices.add(index)
      index = calcNewIndex(operations, index)
      if (index === operations.length) {
        // return acc
        return acc
      }
    }
    // return the value of the checked operation back to its original
    operations[i] = opString
  }
}

function calcNewIndex (operations, index) {
  const operation = operations[index].split(' ')
  const instruction = operation[0]
  const value = operation[1]

  const operator = value[0]
  const number = parseInt(value.substring(1))
  if (instruction === 'jmp') {
    return operator === '+' ? index + number : index - number
  }
  if (instruction === 'acc') {
    operator === '+' ? acc += number : acc -= number
  }
  return index + 1
}

console.log(solvePart1(operations))
console.log(solvePart2(operations))
