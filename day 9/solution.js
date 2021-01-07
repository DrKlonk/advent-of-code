input = require('./input.js').input.split('\n')

const preamble = 25

function solvePart1 (numbers) {
        // Create an array of Sets, one for each number
    sumsets = numbers.map(n => new Set());
    numbers = numbers.map(n=>+n)
        // init the sets for the first ones
        for (let j = 0; j < preamble; j++) {
            for (let k = j+1; k < preamble; k++) {
                sumsets[j].add(numbers[j] + +numbers[k])
            }
        }
    
    for (let i = preamble; i < numbers.length; i++) {
        // when checking a number, check against <preamble> sets before this one
        if (sumsets.slice(i-preamble, i).some(ss => ss.has(numbers[i]))) {
            // then, add numbers[x] + numbers[i] to set[x].
            for (let x = i-preamble+1; x<i+1; x++) {
                sumsets[x].add(numbers[i] + numbers[x])
            }
            continue
        }
        // if it does not exist, return numbers[i]
        return numbers[i]
    }
}

console.log(solvePart1(input))