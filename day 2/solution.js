
const inputFile = require('./input.js');

const parsedInput = inputFile.input.split('\n');

function solvePart1(input) {
    let correctPasswords = 0;
    for (var i = 0; i < input.length; i++) {
        const row = input[i].split(' ');
        const minMax = row[0].split('-');
        const min = minMax[0];
        const max = minMax[1];
        const character = row[1].charAt(0);
        const password = row[2];
        numberOfTimes = (password.match(new RegExp(character, "g")) || []).length;
        if (numberOfTimes >= min && numberOfTimes <=max) {
            correctPasswords++;
        }
    }
    return correctPasswords;
}

console.log(solvePart1(parsedInput));