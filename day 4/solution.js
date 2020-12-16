const inputFile = require('./input');

const parsedInput = inputFile.input.split("\n\n");

const neededFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'] // every field except 'cid'

function solvePart1(input) {
    validPassports = 0;
    for (var i = 0; i < input.length; i++) {
        isPassportValidPart1(input[i]) && validPassports++;
    }
    return validPassports;
}

function solvePart2(input) {    
    validPassports = 0;
    for (var i = 0; i < input.length; i++) {
        const fields = input[i].split(/\s/g).map(field => field.substring(0, 3));
        if (isPassportValidPart1(fields)) {
            isPassportValidPart2(fields) && validPassports++;
        }
    }
    return validPassports;
}

function isPassportValidPart1(fields) {        
    return neededFields.every(neededField => fields.includes(neededField))
}

function isPassportValidPart2(passport) {

}

console.log(solvePart1(parsedInput));
console.log(solvePart2(parsedInput));

