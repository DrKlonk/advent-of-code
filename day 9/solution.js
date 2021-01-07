input = require('./input.js').input.split('\n')

const preamble = 25

function solvePart1 (numbers) {
        // Create an array of Sets, one for each number
    sumsets = numbers.map(n => new Set());
    numbers = numbers.map(n=>+n)
        // init the sets for the first ones
        for (let j = 0; j < preamble; j++) {
            for (let k = j+1; k < preamble; k++) {
                sumsets[j].add(numbers[j] + numbers[k])
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

function solvePart2 (numbers, number) {
    // Find the contigious set in numbers that sum up to number.
    numbers = numbers.map(n=>+n)
    for (let i = 0; i < numbers.length; i++) {
        let sum = numbers[i];
        let endIdx = i + 1;
        while (sum < number) {
            sum += numbers[endIdx]
            if (sum === number) {
               return answer(i, endIdx, numbers)
            }
            endIdx++
        }
    }
}

function answer (start, end, numbers) {
    // if === return sum of min and max from range
    const range = numbers.slice(start, end)
    return Math.max(...range) + Math.min(...range)
}

console.log(solvePart1(input))
console.log(solvePart2(input, 29221323))