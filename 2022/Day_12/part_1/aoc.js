/**
 * AOC Day 12 Part 1
 */

const map = document.querySelector('.aoc_12_sample').textContent.split('\n')

console.log(map)

let start = { X: 0, Y: 0 }
let end = { X: 0, Y: 0 }

const defineCoordinates = (array) => {
  let coordinates = {}
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      coordinates[array[i][j]]
        ? null
        : (coordinates = { ...coordinates, [array[i][j]]: [] })
      coordinates[array[i][j]].push({ X: j, Y: i })
      if (array[i][j] === 'S') (start.X = j), (start.Y = i)
      if (array[i][j] === 'E') (end.X = j), (end.Y = i)
    }
  }
  return coordinates
}

const coordinates = defineCoordinates(map)

const alphabet = 'SabcdefghijklmnopqrstuvwxyzE'
let alphabetIndex = 1
let path = []

console.log(coordinates)

while (start.X !== end.X || start.Y !== end.Y) {
  const left = Math.round(start.X - 1)
  const upper = Math.round(start.Y + 1)
  const right = Math.round(start.X + 1)
  const down = Math.round(start.Y - 1)

  const xAbcis = end.X - start.X
  const yAbcis = end.Y - start.Y

  console.log(coordinates[alphabet[alphabetIndex]])
  path.push(start.X + '.' + start.Y)

  if (coordinates[alphabet[alphabetIndex]].includes({X:start.X+1, Y:start.Y})) 
  
  alphabetIndex++
}

//console.log(path)
