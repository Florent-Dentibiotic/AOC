/**
 * AOC Day 1
 */
const input = document.querySelector('pre').textContent
const response = document.querySelector('#response')
const regex_up = new RegExp('\\(', 'g')
const regex_down = new RegExp('\\)', 'g')

const going_upstairs = input.match(regex_up).length
const going_downstairs = input.match(regex_down).length

const basement = -1
let position = 0
let first_enter = []

for (let i = 1; i < input.length; i++) {
  input[i - 1] === '(' ? position++ : position--
  if (position === basement) {
    first_enter.push(i)
  }
}
response.textContent = first_enter[0]
