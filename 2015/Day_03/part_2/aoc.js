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

const parcourt = (path, index, santa_location, robot_location, locations) => {
  locations.add(`${santa_location.x},${santa_location.y}`)
  locations.add(`${robot_location.x},${robot_location.y}`)
  if (index === path.length) return locations
  return parcourt(
    path,
    index + 2,
    directions[path[index]](santa_location),
    directions[path[index + 1]](robot_location),
    locations
  )
}

const unique_locations = new Set()
response.textContent = parcourt(
  input,
  0,
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  unique_locations
).size
