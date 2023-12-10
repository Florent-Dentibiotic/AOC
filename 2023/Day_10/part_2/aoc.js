/**
 * AOC Day 10
 */
const exemple = document.querySelector('#exemple').textContent
const exemple2 = document.querySelector('#exemple_2').textContent
const exemple3 = document.querySelector('#exemple_3').textContent
const exemple4 = document.querySelector('#exemple_4').textContent
const input_1 = document.querySelector('#input').textContent
const input_2 = document.querySelector('#input_2').textContent
const response = document.querySelector('#response')
const visualisation = document.querySelector('#visualisation')

const rules = {
  '|': 'NS',
  '-': 'WE',
  L: 'SE',
  J: 'WN',
  7: 'WN',
  F: 'SE',
}

const define_new_direction = (grid, previous_position, direction) => {
  let new_position = {
    x: previous_position.x + direction.x,
    y: previous_position.y + direction.y,
  }
  const new_symbol =
    grid[previous_position.x + direction.x][previous_position.y + direction.y]

  let new_direction

  if (direction.y > 0) {
    new_symbol === '-' &&
      ((new_direction = { x: 0, y: 1 }), (new_position = { ...new_position, d: 'R' }))
    new_symbol === 'J' &&
      ((new_direction = { x: -1, y: 0 }), (new_position = { ...new_position, d: 'U' }))
    new_symbol === '7' &&
      ((new_direction = { x: 1, y: 0 }), (new_position = { ...new_position, d: 'D' }))
  }
  if (direction.y < 0) {
    new_symbol === '-' &&
      ((new_direction = { x: 0, y: -1 }), (new_position = { ...new_position, d: 'L' }))
    new_symbol === 'L' &&
      ((new_direction = { x: -1, y: 0 }), (new_position = { ...new_position, d: 'U' }))
    new_symbol === 'F' &&
      ((new_direction = { x: 1, y: 0 }), (new_position = { ...new_position, d: 'D' }))
  }
  if (direction.x < 0) {
    new_symbol === '|' &&
      ((new_direction = { x: -1, y: 0 }), (new_position = { ...new_position, d: 'U' }))
    new_symbol === 'F' &&
      ((new_direction = { x: 0, y: 1 }), (new_position = { ...new_position, d: 'R' }))
    new_symbol === '7' &&
      ((new_direction = { x: 0, y: -1 }), (new_position = { ...new_position, d: 'L' }))
  }
  if (direction.x > 0) {
    new_symbol === '|' &&
      ((new_direction = { x: 1, y: 0 }), (new_position = { ...new_position, d: 'D' }))
    new_symbol === 'L' &&
      ((new_direction = { x: 0, y: 1 }), (new_position = { ...new_position, d: 'R' }))
    new_symbol === 'J' &&
      ((new_direction = { x: 0, y: -1 }), (new_position = { ...new_position, d: 'L' }))
  }
  if (new_symbol === 'S') new_position = { ...new_position, d: 'U' }
  return [new_position, new_direction]
}

let isInTheLoop = new Map()

const loop_length = (grid, position, direction, step, start_position) => {
  if (position.x === start_position.x && position.y === start_position.y && step > 1)
    return step
  const [new_position, new_direction] = define_new_direction(grid, position, direction)
  isInTheLoop.set(`${new_position.x},${new_position.y}`, new_position.d)
  return loop_length(grid, new_position, new_direction, step + 1, start_position)
}

const contestResponse = (input, x, y) => {
  const grid = input.split('\n').map((line) => line.split(''))
  let start_position = grid.reduce((acc, line, index) => {
    return line.indexOf('S') === -1 ? acc : (acc = { x: index, y: line.indexOf('S') })
  })
  const path = loop_length(grid, start_position, { x, y, d: 'U' }, 0, start_position)

  return path
}

let size = 1

const insideTheLoop = (input) => {
  const grid = input.split('\n').map((line) => line.split(''))
  let in_the_loop = new Map()
  let not_in_loop = new Map()
  for (let x = 0; x < grid.length; x++) {
    size = grid.length * grid[0].length
    for (let y = 0; y < grid[x].length; y++) {
      const loopPoint = isInTheLoop.get(`${x},${y}`)
      //console.log(x, y, loopPoint)
      if (loopPoint) {
        continue
      }
      //console.log(grid[x].length, grid.length)
      if (x === 0 || y === 0 || x === grid.length - 1 || y === grid[x].length - 1) {
        not_in_loop.set(`${x},${y}`, 1)
        continue
      }
      const outside_up = not_in_loop.get(`${x - 1},${y}`)
      const outside_left = not_in_loop.get(`${x},${y - 1}`)

      if (outside_up) {
        not_in_loop.set(`${x},${y}`, 1)
        continue
      }
      if (outside_left) {
        not_in_loop.set(`${x},${y}`, 1)
        continue
      }
      const symbol_up = grid[x - 1][y]
      const loop_up = isInTheLoop.get(`${x - 1},${y}`)
      if (loop_up === 'R') {
        not_in_loop.set(`${x},${y}`, 1)
        continue
      }
      if (symbol_up === 'J' && loop_up === 'U') {
        not_in_loop.set(`${x},${y}`, 1)
        continue
      }
      const loop_down = isInTheLoop.get(`${x + 1},${y}`)
      if (loop_down === 'L') {
        not_in_loop.set(`${x},${y}`, 1)
        continue
      }
      const loop_left = isInTheLoop.get(`${x},${y - 1}`)
      if (loop_left === 'U') {
        not_in_loop.set(`${x},${y}`, 1)
        continue
      }
      const loop_right = isInTheLoop.get(`${x},${y + 1}`)
      if (loop_right === 'D') {
        not_in_loop.set(`${x},${y}`, 1)
        continue
      }
      in_the_loop.set(`${x},${y}`, 1)
    }
  }
  in_the_loop
  return not_in_loop
}

const firstPart = contestResponse(input_1, 1, 0)
const outside_loop = insideTheLoop(input_1)

response.textContent = size - (firstPart + outside_loop.size)

const create_grid_element = (content, color) => {
  const div = document.createElement('div')
  div.classList.add(color)
  div.textContent = content
  visualisation.appendChild(div)
}

const coloring_gird = (input) => {
  const grid = input.split('\n').map((line) => line.split(''))
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const loopPoint = isInTheLoop.get(`${x},${y}`)
      //console.log(x, y, loopPoint)
      if (loopPoint) {
        create_grid_element(grid[x][y], 'green')
        continue
      }
      const outLoop = outside_loop.get(`${x},${y}`)
      if (outLoop) {
        create_grid_element('o', 'blue')
        continue
      }
      create_grid_element('I', 'red')
    }
  }
}

coloring_gird(input_1)
