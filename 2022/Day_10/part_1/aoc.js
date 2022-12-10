/**
 * AOC Day 10 Part 1
 */

const signals = document.querySelector('.aoc_10').textContent.split('\n')

let X = 1
let cycle = 0

const effects = (value) => {
  X += value
}

let signal_strengths = []

for (const signal of signals) {
  const signalType = signal.split(' ')[0]
  const value = Number.parseInt(signal.split(' ')[1] ?? 0)
  if (signalType === 'addx') {
    cycle++
    if (cycle === 20 || (cycle - 20) % 40 === 0) {
      signal_strengths.push({ X: cycle * X })
    }
  }

  cycle++
  if (cycle === 20 || (cycle - 20) % 40 === 0) {
    signal_strengths.push({ X: cycle * X })
  }
  effects(value)
}

console.log(signal_strengths.reduce((acc, cur) => (acc += cur.X), 0))
