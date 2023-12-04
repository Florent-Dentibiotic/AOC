/**
 * AOC Day 1
 */
const input = document.querySelector('pre').textContent
const response = document.querySelector('#response')
const regex_up = new RegExp('\\(', 'g')
const regex_down = new RegExp('\\)', 'g')

const going_upstairs = input.match(regex_up).length
const going_downstairs = input.match(regex_down).length

response.textContent = going_upstairs - going_downstairs
