const input = require('./input').input.split('\n').map(n => +n)

function solvePart1(jolts) {
    jolts = jolts.sort((a, b) => a - b)
    let oneStep = 0, threeSteps = 1
    
    if (jolts[0] === 1) {
        oneStep++
    }
    if (jolts[0] === 3) {
        threeSteps++
    }

    for (let i = 0; i < jolts.length; i++) {
        if (jolts[i+1] === jolts[i] + 1) {
            oneStep++
        } 
        if (jolts[i+1] === jolts[i] + 3) {
            threeSteps++
        } 
    }
    return oneStep * threeSteps
}

console.log(solvePart1(input))