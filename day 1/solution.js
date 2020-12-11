// https://adventofcode.com/2020/day/1
// Part 1: Find the first two numbers in a list that add up to 2020
//  return the multiplication of both numbers
// Part 2: The same, but with three numbers

const inputFile = require('./input.js');

const parsedInput = inputFile.input.split('\n').map(x => {
    return Number.parseInt(x)
});

// Use a Set to track and lookup the numbers we've passed so far
const tracker = new Set();

function solvePart1(input) {
    for (var i = 0; i < input.length; i++) {
        const currentNumber = input[i];
        if (tracker.has(2020 - currentNumber)) {
            // We found the solution!
            return currentNumber * (2020 - currentNumber);
        }
        tracker.add(currentNumber);
    }
}

// Use an array to track sums and multiplications of couples of numbers in the index and value respectively
const trackerArray = new Array(2020).fill(0);

function solvePart2(input) {
    for (var i = 0; i < input.length; i++) {
        const currentNumber = input[i];
        if (trackerArray[2020 - currentNumber] > 0) {
            // We found the solution!
            return currentNumber * trackerArray[2020 - currentNumber];
        }
        // Loop back and add multiplications to array
        // Use the sum as index
        // Only do this if the sum is < 2020 and if this index (sum) wasn't filled before
        for (var j = i; j >= 0; j--) {
            if (input[i] + input[j] < 2020 && trackerArray[input[i] + input[j]] == 0) {
                trackerArray[input[i] + input[j]] = input[i] * input[j];
            }
        }
    }
}

const answer1 = solvePart1(parsedInput);
const answer2 = solvePart2(parsedInput);

console.log(answer1, answer2);