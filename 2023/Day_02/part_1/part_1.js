/**
 * AOC Day 2
 */
const input_1 = document.querySelector('pre').textContent
const response_1 = document.querySelector('#response_1')

// PART 1

const purpose = {
  red: 12,
  green: 13,
  blue: 14,
}

let gamesDetails = []

const part_1 = input_1.split('\n').reduce((acc, game) => {
  const gameDetails = game.split(':')
  const gameNumber = gameDetails[0]
  const hands = gameDetails[1].split(';')
  const handDetails = hands.map((hand) => hand.split(','))
  handDetails.map((hand) =>
    hand.map((detail) => {
      const couple = detail.trim().split(' ')
      if (couple[0] > purpose[couple[1]])
        return gamesDetails.push(gameNumber.split(' ')[1])
    })
  )
  return (acc += parseInt(gameNumber.split(' ')[1]))
}, 0)

const falseGamesSum = Array.from(new Set(gamesDetails)).reduce((acc, cur) => {
  return (acc += parseInt(cur))
}, 0)

response_1.textContent = part_1 - falseGamesSum
