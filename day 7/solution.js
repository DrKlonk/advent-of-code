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

function solvePart2(rules) {
    let rulesArray = rules.map(rule => convertToObjectPart2(rule))
    // Recursively check how many bags are in the shiny gold bag.
    return getBagsInBag(rulesArray, 'shiny gold') - 1; // -1 for the shiny gold bag itself

}

function getBagsInBag(rulesArray, colorName) {
    // Check the bags in the subcolors
    const currentColor = rulesArray.find(rule => rule.color == colorName);
    if (currentColor.colors.length === 0) {
        return 1;
    }
    let bagsInThisBag = 1; // 1 for this bag
    for (var i = 0; i < currentColor.colors.length; i++) {
        const subColorObject = currentColor.colors[i];
        bagsInThisBag += subColorObject.amount * getBagsInBag(rulesArray, subColorObject.subColor);
    }
    return bagsInThisBag;
}

function convertToObjectPart2(rule) {
    // Make the string into an object: 
    // { color: 'shiny gold', colors: [{amount: 1, color: dark olive}, {etc..}] }
    ruleSplitOnBags = rule.split(' bags ');
    const color = ruleSplitOnBags[0];
    const restString = rule.split('contain ')[1];
    
    if (restString === 'no other bags.') {
        // no bags in this bag.
        return { color, colors: []}
    }
    return {
        color,
        colors: 
            restString.split(', ').map(bagString => {
            const bagStringSplit = bagString.split(' ');
            const subColor = bagStringSplit[1] + ' ' + bagStringSplit[2];
            const amount = bagStringSplit[0];
            return { amount, subColor };
        })
    }
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
console.log(solvePart2(rules));