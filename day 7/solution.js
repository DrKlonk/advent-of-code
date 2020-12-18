const rules = require('./input').input.split('\n');

function solvePart1(rules) {
    let goodColors = new Set(['shiny gold']);
    let badColors = new Set();

    // Add all colors to toBeChecked
    let toBeCheckedRules = new Set(rules.map(rule => convertToObject(rule)))

    while (toBeCheckedRules.size) {
        toBeCheckedRules.forEach(rule => {
            if (rule.color === 'shiny gold') {
                toBeCheckedRules.delete(rule);
            }
            if (rule.colors.length === 0) {
                badColors.add(rule.color);
            }
            // if any is good, add to good.
            if (rule.colors.some(color => goodColors.has(color))) {
                goodColors.add(rule.color);
                toBeCheckedRules.delete(rule);
            }
            // If all of them bad, remove from toBeChecked
            if (rule.colors.every(color => badColors.has(color))) {
                badColors.add(rule.color);
                toBeCheckedRules.delete(rule);
            }
            // Else: there are some unclear colors in this rule, keep it in to be checked
        })
    }
    return goodColors.size - 1; // 'remove "shiny gold" from the good colors to get the right number'
}

function convertToObject(rule) {
    // Convert the rule (a string) to:
    // { color: 'bright white', colors: ['shiny gold', 'dull lavender'] } 
    const color = rule.split(' bags ')[0];
    const restString = rule.split(' contain ')[1]
    if (restString === 'no other bags.') {
        return { color, colors: [] };
    }
    const colors = restString.split(', ').map(con => {
        const c = con.split(' ');
        return c[1] + ' ' + c[2];
    })

    return { color, colors };
}

console.log(solvePart1(rules));