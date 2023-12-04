/**
 * AOC Day 4 Part_1
 */
const input = document.querySelector('pre').textContent
const response = document.querySelector('#response')
const games = input.split('\n')
const number_regex = new RegExp('[0-9]+', 'g')

const solution = games.reduce((acc, game) => {
  const all_num = game.match(number_regex).splice(1)
  const unique = new Set(all_num).size
  let repeated = all_num.length - unique
  const current = repeated > 0 ? 1 * Math.pow(2, repeated - 1) : 0
  return acc + current
}, 0)

response.textContent = solution
