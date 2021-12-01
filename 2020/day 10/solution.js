let jolts = require('./input').input.split('\n').map(n => +n)
jolts.push(0)
jolts = jolts.sort((a, b) => a - b)

function solvePart1() {
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

let DP = {}
function solvePart2() {
    return dp(0)
}

// Dynamic programming!
function dp(idx) {
    if (idx == jolts.length - 1) {
        return 1 // one way to get to the end
    }
    // if idx in DP, return that value
    if (DP[idx]) {
        return DP[idx]
    }
    let ans = 0;
    for (let j = idx + 1; j <= idx + 3; j++) {
        // look back to see how many ways we can get to jolts[idx]
        if (jolts[j] - jolts[idx] <= 3) {
            // we can get from j to i in one step
            ans += dp(j)
        }
    }
    DP[idx] = ans
    return ans
}

console.log(solvePart1())
console.log(solvePart2())