/**
 * AOC Day 5
 */

let crates = {
  1: ['V', 'Q', 'W', 'M', 'B', 'N', 'Z', 'C'],
  2: ['B', 'C', 'W', 'R', 'Z', 'H'],
  3: ['J', 'R', 'Q', 'F'],
  4: ['T', 'M', 'N', 'F', 'H', 'W', 'S', 'Z'],
  5: ['P', 'Q', 'N', 'L', 'W', 'F', 'G'],
  6: ['W', 'P', 'L'],
  7: ['J', 'Q', 'C', 'G', 'R', 'D', 'B', 'V'],
  8: ['W', 'B', 'N', 'Q', 'Z'],
  9: ['J', 'T', 'G', 'C', 'F', 'L', 'H'],
}

const moves = document.querySelector('.aoc_5_moves').textContent.split('\n')
const moves_numbers = moves.map((move) => {
  let separate = move.split(' ')
  let numbers = separate.filter((el) => el != 'move' && el != 'from' && el != 'to')
  return numbers
})
/* PART 1
moves_numbers.forEach((turn) => {
  const pile = turn[1]
  const length = turn[0]
  const destination = turn[2]
  crates[destination] = crates[pile]
    .slice(0, length)
    .reverse()
    .concat(crates[destination])
  crates[pile] = crates[pile].slice(length, crates[pile].length)
})
*/

// PART 2
moves_numbers.forEach((turn) => {
  const pile = turn[1]
  const length = turn[0]
  const destination = turn[2]
  crates[destination] = crates[pile].slice(0, length).concat(crates[destination])
  crates[pile] = crates[pile].slice(length, crates[pile].length)
})

let higher = Object.values(crates).reduce((acc, cur) => (acc += cur[0]), '')

console.log(higher)
