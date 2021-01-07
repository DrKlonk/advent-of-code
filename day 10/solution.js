let jolts = require('./input').input.split('\n').map(n => +n)

function solvePart1() {
    jolts.push(0)
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

let DP = {}
function solvePart2() {    
    // dp(i) = number of ways to get to the end.
    // dp(end) = 1
    // if there are multiple ways to get to dp(i), add their dp(j) to dp(i).
    // if you are done with that, save dp(i) to an array
    jolts.push(0)
    jolts = jolts.sort((a, b) => a - b)
    return dp(0)
    // return jolts
    // .reduce(
    //   (acc, value) => {
    //     acc[value] =
    //       (acc[value - 3] || 0) + (acc[value - 2] || 0) + (acc[value - 1] || 0);
    //     return acc;
    //   },
    //   [1]
    // )
    // .pop();
}

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