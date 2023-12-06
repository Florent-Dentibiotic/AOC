/**
 * AOC Day 5
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')
const number_regex = new RegExp('[0-9]+', 'g')

const nextValue = (previous, rules, rulesIndex, ruleIndex) => {
  if (rules.length === rulesIndex) return previous
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

const defineRules = (input) => {
  const lines = input.split('\n')
  const rule_name = lines.shift()
  const rules = lines.map((line) => line.match(number_regex))
  return rules
}

const groups = input.split('\n\n')

const seeds = groups.shift().match(number_regex)

const rules = groups.map((group) => defineRules(group))

const location_list = seeds
  .map((seed) => nextValue(seed, rules, 0, 0))
  .sort((a, b) => a - b)

response.textContent = location_list[0]
