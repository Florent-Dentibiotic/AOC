/**
 * AOC Day 10 Part 1
 */

const signals = document.querySelector('.aoc_10').textContent.split('\n')

let X = 1
let cycle = 0

const effects = (value) => {
  X += value
}

let signal_values = ''

for (const signal of signals) {
  const signalType = signal.split(' ')[0]
  const value = Number.parseInt(signal.split(' ')[1] ?? 0)
  if (signalType === 'addx') {
    signal_values +=
      cycle % 40 === X || cycle % 40 === X - 1 || cycle % 40 === X + 1 ? '#' : '.'
    cycle++
    console.log(cycle % 40, X)
    if (cycle % 40 === 0) {
      signal_values += '\n'
    }
  }

  signal_values +=
    cycle % 40 === X || cycle % 40 === X - 1 || cycle % 40 === X + 1 ? '#' : '.'
  cycle++

  console.log(cycle % 40, X)
  if (cycle % 40 === 0) {
    signal_values += '\n'
  }

  effects(value)
}

console.log(signal_values)
