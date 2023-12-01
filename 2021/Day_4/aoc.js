/**
 * AOC Day 1
 */
const input = document.querySelector('pre').textContent
const bingos = input.split('\n\n')
const sequence = bingos.shift()

console.log(sequence.split(',').length)

let bestIndex = 100

const defineBestScore = (bingo) => {
  let rows = bingo.split('\n')
  let columns = [[], [], [], [], []]
  rows.map((row) =>
    row.split(' ').map((num, index) => (num === '' ? null : console.log(index)))
  )
  console.log(rows, columns)
}

defineBestScore(bingos[1])
