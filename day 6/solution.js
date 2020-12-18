const groups = require('./input').input.split('\n\n');

function solvePart1(groups) {
    let totalSum = 0;
    for (var i = 0; i < groups.length; i++) {
        totalSum += calcUniqueChars(groups[i]).size;
    }
    return totalSum;
}

function calcUniqueChars(group) {
    uniqueChars = new Set();
    for (var i = 0; i < group.length; i++) {
        const currentChar = group[i];
        if (uniqueChars.has(currentChar) || currentChar === '\n') {
            continue;
        } 
        uniqueChars.add(currentChar);
    }
    return uniqueChars;
}

function solvePart2(groups) {
    let totalSum = 0;
    for (var i = 0; i < groups.length; i++) {
        totalSum += calcCommonChars(groups[i]);
    }
    return totalSum;
}

function calcCommonChars(group) {
    const answers = group.split('\n');
    let commonChars = calcUniqueChars(answers[0]);
    for (var i = 0; i < answers.length; i++) {
        const currentAnswer = answers[i];
        commonChars.forEach(char => {
            if (currentAnswer.indexOf(char) == -1) {
                commonChars.delete(char);
            }
        });
    }
    return commonChars.size;
}

console.log(solvePart1(groups));
console.log(solvePart2(groups));