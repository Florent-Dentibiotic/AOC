/**
 * AOC Day 2
 */
const input = document.querySelector('pre').textContent
const response_1 = document.querySelector('#response_1')
const response_2 = document.querySelector('#response_2')

// PART 1

const purpose = {
  red: 12,
  green: 13,
  blue: 14,
}

let gamesDetails = []

const part_1 = input.split('\n').reduce((acc, game) => {
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

// PART 2

const PART_2 = input.split('\n').reduce((acc, game) => {
  let fewestCubes = { red: 0, green: 0, blue: 0 }
  const gameDetails = game.split(':')

  // making all hands in a flat array
  const hands2 = gameDetails[1]
    .split(';')
    .map((hand) => hand.split(','))
    .flat()

  // defining the minimum quantity of each color (don't forget to parseInt values)
  hands2.map((detail) => {
    const couple = detail.trim().split(' ')
    if (fewestCubes[couple[1]] < parseInt(couple[0]))
      return (fewestCubes = { ...fewestCubes, [couple[1]]: parseInt(couple[0]) })
    return fewestCubes
  })

  const POWER = Object.values(fewestCubes).reduce((acc, cur) => (acc *= cur), 1)
  return (acc += POWER)
}, 0)

response_2.textContent = PART_2
