/**
 * AOC Day 1
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')

const entries = input.split(',')

const define_result = (sequence, current_value, index) => {
  current_value += sequence.charCodeAt(index)
  current_value *= 17
  current_value = current_value % 256
  if (index + 1 === sequence.length) return current_value
  return define_result(sequence, current_value, index + 1)
}

const results = entries.map((string) => define_result(string, 0, 0))

response.textContent = results.reduce((acc, cur) => acc + cur, 0)
