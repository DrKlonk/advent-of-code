const inputFile = require('./input.js');

const parsedInput = inputFile.input.split('\n');

const rowLength = parsedInput[0].length; 

function solvePart1(input) {
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


function solvePart2(input) {
    xValues = new Array(5).fill(0);
    trees = new Array(5).fill(0);

    let treesHit = 0;
    let xValue = 0;
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < xValues.length; j++) {
            if (input[i].charAt(xValues[j]) == '#') {
                // We need to skip counting trees for j == 4 on uneven rows
                if (j != 4 || i % 2 == 0) {
                    trees[j]++;
                }
            }
        }
        updateXValues(i);
    }
    return trees;
}

function updateXValues(rowNumber) {
    // [0] = Right 1, down 1.
    // [1] = Right 3, down 1. (This is the slope you already checked.)
    // [2] = Right 5, down 1.
    // [3] = Right 7, down 1.
    // [4] = Right 1, down 2.
    xValues[0] = (xValues[0] + 1) % rowLength;
    xValues[1] = (xValues[1] + 3) % rowLength;
    xValues[2] = (xValues[2] + 5) % rowLength;
    xValues[3] = (xValues[3] + 7) % rowLength;
    if (rowNumber % 2 == 1) {
        // Update the xValue on uneven rows
        xValues[4] = (xValues[4] + 1) % rowLength;
    }
}

console.log(solvePart1(parsedInput));

console.log(solvePart2(parsedInput).reduce((total, number) => {
    return total * number;
}));