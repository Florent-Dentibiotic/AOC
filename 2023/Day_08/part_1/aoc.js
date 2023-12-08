/**
 * AOC Day 8
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')
const three_letters_regex = new RegExp('[A-Z][A-Z][A-Z]', 'g')

const rules = input.split('\n')
const path = rules.shift()
let grid = {}
rules.shift()

for (const rule of rules) {
  const letters = rule.match(three_letters_regex)
  grid = { ...grid, [letters[0]]: { L: letters[1], R: letters[2] } }
}

const reachZZZ = (position, sideIndex, step) => {
  //console.log(position, grid[position], sideIndex, path[sideIndex])
  if (position == 'ZZZ') return step
  let next = grid[position][path[sideIndex]]

  return reachZZZ(next, sideIndex + 1 === path.length ? 0 : sideIndex + 1, step + 1)
}

response.textContent = reachZZZ('AAA', 0, 0)
