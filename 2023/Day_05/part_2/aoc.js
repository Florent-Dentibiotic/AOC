/**
 * AOC Day 5
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')
const number_regex = new RegExp('[0-9]+', 'g')

const groups = exemple.split('\n\n')

const seeds = groups.shift().match(number_regex)

const defineRules = (input) => {
  const lines = input.split('\n')
  const rule_name = lines.shift()
  const rules = lines.map((line) => line.match(number_regex))
  return rules
}

const rules = groups.map((group) => defineRules(group))

let values = []

for (let i = 0; i < rules.length; i++) {
  values.push([])
}

const nextValue = (previous, rules, rulesIndex, ruleIndex) => {
  //console.log(rulesIndex)
  if (rules.length === rulesIndex) {
    return previous
  }
  !values[rulesIndex].includes(previous) && values[rulesIndex].push(previous)
  if (rules[rulesIndex].length === ruleIndex)
    return nextValue(previous, rules, rulesIndex + 1, 0)
  currentRules = rules[rulesIndex]

  let newValue
  let min = parseInt(currentRules[ruleIndex][1])
  let max = parseInt(currentRules[ruleIndex][1]) + parseInt(currentRules[ruleIndex][2])
  if (parseInt(previous) >= min && parseInt(previous) <= max) {
    newValue = parseInt(currentRules[ruleIndex][0]) + parseInt(previous) - min
  }

  if (newValue) return nextValue(newValue, rules, rulesIndex + 1, 0)
  if (currentRules.length === ruleIndex)
    return nextValue(previous, rules, rulesIndex + 1, 0)
  return nextValue(previous, rules, rulesIndex, ruleIndex + 1)
}

const fineTheSmallestLocation = (current, rules, rulesIndex, ruleIndex) => {
  if (rules.length === rulesIndex) return current
  return fineTheSmallestLocation(current, rules, rulesIndex, ruleIndex + 1)
}

let newSeeds = []

for (let i = 0; i < 14; i++) {
  newSeeds.push(79 + i)
}
for (let i = 0; i < 13; i++) {
  newSeeds.push(55 + i)
}

const location_list = newSeeds.map((seed) => nextValue(seed, rules, 0, 0))
//.sort((a, b) => a - b)

console.log(seeds, rules)

console.log(values, location_list)
