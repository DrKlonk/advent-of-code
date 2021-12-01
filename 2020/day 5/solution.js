const boardingPasses = require('./input.js').input.split('\n');

function solvePart1(boardingPasses) {
    let maxBP = 0;
    for (var i = 0; i < boardingPasses.length; i++) {
        const bpValue = calcBoardingPassValue(boardingPasses[i]);
        if (bpValue > maxBP) {
            maxBP = bpValue; 
        }
    }
    return maxBP;
}

function solvePart2(boardingPasses) {
    // Get the missing boarding pass
    // Create a Set for looking up if the neighbours exist
    bpSet = new Set();
    for (var i = 0; i < boardingPasses.length; i++) {
        bpSet.add(calcBoardingPassValue(boardingPasses[i]));
    }
    // Use the answer of part one (813) to loop (possibly) less
    for (var j = 813; j >= 0; j--) {
        if (!bpSet.has(j) && bpSet.has(j - 1) && bpSet.has(j + 1)) {
            return j;
        }
    }
}

function calcBoardingPassValue(boardingPass) {
    // Note how the boarding passes translate to binary numbers.
    const row = boardingPass.substring(0, 7).replace(/B/g, '1').replace(/F/g, '0');
    const column = boardingPass.substring(7, 10).replace(/R/g, '1').replace(/L/g, '0');

    return parseInt(row, 2) * 8 + parseInt(column, 2);
}

console.log(solvePart1(boardingPasses));
console.log(solvePart2(boardingPasses));