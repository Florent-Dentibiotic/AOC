/**
 * AOC Day 2
 */
const input_2 = document.querySelector('pre').textContent
const response_2 = document.querySelector('#response_2')

const PART_2 = input_2.split('\n').reduce((acc, game) => {
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
