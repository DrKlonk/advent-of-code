
const inputFile = require('./input.js');

const parsedInput = inputFile.input.split('\n');

function solvePart1(input) {
    let correctPasswords = 0;
    for (var i = 0; i < input.length; i++) {
        // Input preview: "1-13 a: passwordExample"
        const row = input[i].split(' ');
        const minMax = row[0].split('-');
        const min = minMax[0];
        const max = minMax[1];
        const character = row[1].charAt(0);
        const password = row[2];
        numberOfTimes = (password.match(new RegExp(character, "g")) || []).length;
        if (numberOfTimes >= min && numberOfTimes <= max) {
            correctPasswords++;
        }
    }
    return correctPasswords;
}

function solvePart2(input) {
    let correctPasswords = 0;
    for (var i = 0; i < input.length; i++) {
        // Input preview: "1-13 a: passwordExample"
        const row = input[i].split(' ');
        const indices = row[0].split('-');
        const yesIndex = indices[0] - 1;
        const noIndex = indices[1] - 1;
        const character = row[1].charAt(0);
        const password = row[2];
        // Exactly one (!) of the indices must contain the character
        if (password.charAt(yesIndex) === character) {
            password.charAt(noIndex) !== character && correctPasswords++;
        } else {
            password.charAt(noIndex) === character && correctPasswords++;
        } 
    }
    return correctPasswords;
}

console.log(solvePart1(parsedInput));
console.log(solvePart2(parsedInput));