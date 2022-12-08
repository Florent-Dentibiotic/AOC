/**
 * AOC Day 2
 */

// Opponent : A for Rock, B for Paper, and C for Scissors
// Me : X for Rock, Y for Paper, and Z for Scissors

const opponent = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
}

const me = {
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
}

const me_V2 = {
  X: 'Lose',
  Y: 'Draw',
  Z: 'Win',
}

const match = {
  'A X': 4,
  'A Y': 8,
  'A Z': 3,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 7,
  'C Y': 2,
  'C Z': 6,
}
const match_V2 = {
  'A X': 3,
  'A Y': 4,
  'A Z': 8,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 2,
  'C Y': 6,
  'C Z': 7,
}

const rock_paper_scissors = document.querySelector('.aoc_2').textContent.split('\n')

const first_turn_score = rock_paper_scissors.map((hand) => {
  return match[hand]
})
const first_total = first_turn_score.reduce((acc, cur) => acc + cur, 0)

const second_turn_score = rock_paper_scissors.map((hand) => {
  return match_V2[hand]
})
const second_solution = second_turn_score.reduce((acc, cur) => acc + cur, 0)
