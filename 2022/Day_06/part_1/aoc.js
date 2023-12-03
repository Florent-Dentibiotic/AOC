/**
 * AOC Day 6
 */

const input_caracters = document.querySelector('.aoc_6').textContent

for (let i = 14; i < input_caracters.length; i++) {
  const part = input_caracters.slice(i - 14, i)
  const exclusive = new Set(part)
  const length = Array.from(exclusive).length
  if (length === 14) console.log(i)
}
