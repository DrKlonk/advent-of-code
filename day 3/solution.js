const inputFile = require('./input.js');

const parsedInput = inputFile.input.split('\n');

function solvePart1(input) {
    rowLength = input[0].length;

    let treesHit = 0;
    let xValue = 0;
    for (var i = 0; i < input.length - 1; i++) {
        if (input[i].charAt(xValue) == '#') {
            treesHit++;
        }
        xValue = (xValue + 3) % rowLength;
    }
    return treesHit;
}
console.log(solvePart1(parsedInput));