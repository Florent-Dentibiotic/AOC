/**
 * AOC Day 3
 */
const exemple = document.querySelector('#exemple').textContent
//const input = document.querySelector('#input').textContent
const response = document.querySelector('#response')

const directions = {
  '<': (position) => (position = { ...position, y: position.y - 1 }),
  '>': (position) => (position = { ...position, y: position.y + 1 }),
  '^': (position) => (position = { ...position, x: position.x + 1 }),
  v: (position) => (position = { ...position, x: position.x - 1 }),
}

const parcourt = (path, index, current_location, locations) => {
  locations.add(`${current_location.x},${current_location.y}`)
  if (index === path.length) return locations
  return parcourt(path, index + 1, directions[path[index]](current_location), locations)
}

const unique_locations = new Set()
response.textContent = parcourt(input, 0, { x: 0, y: 0 }, unique_locations).size
