const inputFile = require('./input');

const passports = inputFile.input.split("\n\n");

const neededFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'] // every field except 'cid'

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

function solvePart1(input) {
    validPassports = 0;
    for (var i = 0; i < input.length; i++) {
        isPassportValidPart1(input[i]) && validPassports++;
    }
    return validPassports;
}

function solvePart2(passports) {    
    validPassports = 0;
    for (var i = 0; i < passports.length; i++) {
        const fields = passports[i].split(/\s/g);
        if (isPassportValidPart1(fields.map(field => field.substring(0, 3)))) {
            isPassportValidPart2(fields) && validPassports++;
        }
    }
    return validPassports;
}

function isPassportValidPart1(fields) {        
    return neededFields.every(neededField => fields.includes(neededField))
}

function isPassportValidPart2(fields) {
    return fields.every(field => {
        keyValue = field.split(":");
        key = keyValue[0];
        value = keyValue[1];
        return isKeyValuePairValid(key, value);
    })
}

function isKeyValuePairValid(key, value) {
    if (key === 'byr') {
        return value >= 1920 && value <= 2002
    } else if (key === 'iyr') {
        return value >= 2010 && value <= 2020
    } else if (key === 'eyr') {
        return value >= 2020 && value <= 2030
    } else if (key === 'hgt') {
        const indicator = value.slice(-2)
        const height = value.substring(0, value.length - 2);

        if (indicator === 'in') {
            return height >= 59 && height <= 76
        }
        if (indicator === 'cm') {
            return height >= 150 && height <= 193
        }
        return false; // The indicator did not match 'in' or 'cm'
    } else if (key === 'hcl') {
        return value.match(new RegExp("^#(?:[0-9a-fA-F]{6}){1,2}$"));
    } else if (key === 'ecl') {
        return eyeColors.includes(value);
    } else if (key === 'pid') {
        return value.match(new RegExp("^(?:[0-9]{9}){1,2}$"));
    } 
    return key === 'cid'; // cid is always OK
}

console.log(solvePart1(passports));
console.log(solvePart2(passports));

