/**
 * AOC Day 1
 */
const input = document.querySelector('pre').textContent
const response = document.querySelector('#response')

const rules = {
  '|': 'NS',
  '-': 'WE',
  L: 'SE',
  J: 'WN',
  7: 'WN',
  F: 'SE',
}

const define_new_direction = (grid, previous_position, direction) => {
  const new_position = {
    x: previous_position.x + direction.x,
    y: previous_position.y + direction.y,
  }
  const new_symbol =
    grid[previous_position.x + direction.x][previous_position.y + direction.y]

  let new_direction

  if (direction.y > 0) {
    new_symbol === '-' && (new_direction = { x: 0, y: 1 })
    new_symbol === 'J' && (new_direction = { x: -1, y: 0 })
    new_symbol === '7' && (new_direction = { x: 1, y: 0 })
  }
  if (direction.y < 0) {
    new_symbol === '-' && (new_direction = { x: 0, y: -1 })
    new_symbol === 'L' && (new_direction = { x: -1, y: 0 })
    new_symbol === 'F' && (new_direction = { x: 1, y: 0 })
  }
  if (direction.x < 0) {
    new_symbol === '|' && (new_direction = { x: -1, y: 0 })
    new_symbol === 'F' && (new_direction = { x: 0, y: 1 })
    new_symbol === '7' && (new_direction = { x: 0, y: -1 })
  }
  if (direction.x > 0) {
    new_symbol === '|' && (new_direction = { x: 1, y: 0 })
    new_symbol === 'L' && (new_direction = { x: 0, y: 1 })
    new_symbol === 'J' && (new_direction = { x: 0, y: -1 })
  }

  //console.log("direction :", new_direction);
  return [new_position, new_direction]
}

const loop_length = (grid, position, direction, step, start_position) => {
  console.log(position, step)
  if (position.x === start_position.x && position.y === start_position.y && step > 1)
    return step
  const [new_position, new_direction] = define_new_direction(grid, position, direction)
  //console.log(new_position, new_direction);
  return loop_length(grid, new_position, new_direction, step + 1, start_position)
}

const contestResponse = (input) => {
  const grid = input.map((line) => line.split(''))
  let start_position = grid.reduce((acc, line, index) =>
    line.indexOf('S') === -1 ? acc : (acc = { x: index, y: line.indexOf('S') })
  )
  const path = loop_length(grid, start_position, { x: -1, y: 0 }, 0, start_position)
  console.log(path)
  return Math.floor(path / 2)
}

const solution = contestResponse(input.split('\n'))

console.log(solution, input.split('\n')[0].length, input.split('\n').length)
