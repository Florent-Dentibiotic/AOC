/**
 * AOC Day 8
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')
const three_letters_regex = new RegExp('[0-9A-Z][0-9A-Z-Z][0-9A-Z-Z]', 'g')
const last_letter_A_regex = new RegExp('[0-9A-Z-Z][0-9A-Z-Z][A]', 'g')
const last_letter_Z_regex = new RegExp('[0-9A-Z-Z][0-9A-Z-Z][Z]', 'g')

const rules = input.split('\n')
const path = rules.shift()
let grid = {}
rules.shift()

const starters = []
const finishers = []
const allPoints = []

for (const rule of rules) {
  const letters = rule.match(three_letters_regex)
  allPoints.push(letters[0])
  allPoints.push(letters[1])
  allPoints.push(letters[2])
  grid = { ...grid, [letters[0]]: { L: letters[1], R: letters[2] } }
  if (last_letter_A_regex.test(letters[0])) starters.push(letters[0])
  if (last_letter_Z_regex.test(letters[0])) finishers.push(letters[0])
}

let final_Z = {}

starters.forEach((start) => (final_Z = { ...final_Z, [start]: [] }))

const reachZZZ = (start, position, sideIndex, step, previousStep) => {
  if (last_letter_Z_regex.test(position)) {
    final_Z[start].push(Number(step) + Number(previousStep))
  }
  if (step === 10000) return { start, position, sideIndex, step }
  let next = grid[position][path[sideIndex]]
  return reachZZZ(
    start,
    next,
    sideIndex + 1 === path.length ? 0 : sideIndex + 1,
    step + 1,
    previousStep
  )
}

const findNextStep = (position, sideIndex) => {
  let next = grid[position][path[sideIndex]]
  return next
}

const firstTest = starters.map((start) => reachZZZ(start, start, 0, 0, 0))
const secondTest = firstTest.map((step) =>
  reachZZZ(step.start, step.position, step.sideIndex, 0, step.step)
)
const thirdTest = secondTest.map((step) =>
  reachZZZ(step.start, step.position, step.sideIndex, 0, step.step + 10000)
)

function pgcd(a, b) {
  if (b) {
    return pgcd(b, a % b)
  } else {
    return Math.abs(a)
  }
}

const results = Object.values(final_Z)
const firstOccurence = results.map((result) => result[0])
response.textContent = firstOccurence.reduce((acc, cur) => acc * (cur / path.length))

//const multiples = [73, 43, 67, 79, 61, 59]
