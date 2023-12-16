/**
 * AOC Day 1
 */
const input = document.querySelector('#input').textContent
const input_2 = document.querySelector('#input_2').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')

const grid = input_2.split('\n')

const directions = {
  U: (position) => (position = { ...position, y: position.y - 1 }),
  D: (position) => (position = { ...position, y: position.y + 1 }),
  L: (position) => (position = { ...position, x: position.x - 1 }),
  R: (position) => (position = { ...position, x: position.x + 1 }),
}

let energized = new Map()

const define_new_direction = (direction, encounter) => {
  if (encounter === '/') {
    switch (direction) {
      case 'R':
        return 'U'
      case 'L':
        return 'D'
      case 'U':
        return 'R'
      case 'D':
        return 'L'
    }
  }
  if (encounter === '\\') {
    switch (direction) {
      case 'R':
        return 'D'
      case 'L':
        return 'U'
      case 'U':
        return 'L'
      case 'D':
        return 'R'
    }
  }
}

const define_new_directions = (direction, encounter) => {
  if (encounter === '|') {
    switch (direction) {
      case 'R':
        return { first: 'D', second: 'U' }
      case 'L':
        return { first: 'U', second: 'D' }
      case 'U':
        return 'U'
      case 'D':
        return 'D'
    }
  }
  if (encounter === '-') {
    switch (direction) {
      case 'R':
        return 'R'
      case 'L':
        return 'L'
      case 'U':
        return { first: 'R', second: 'L' }
      case 'D':
        return { first: 'L', second: 'R' }
    }
  }
}

const light_path = (position, direction, encounters) => {
  console.log(position, direction, encounters)
  const directions_array = energized.get(`${position.y},${position.x}`) ?? []
  if (directions_array.includes(direction)) {
    if (encounters.length === 0) {
      return energized
    }
    const new_position = encounters.pop()
    //console.log(position, direction, encounters)
    return light_path(new_position, new_position.direction, encounters)
  }

  energized.set(`${position.y},${position.x}`, [...directions_array, direction])
  //console.log(position, direction, encounters)

  let new_position = directions[direction](position)

  if (
    new_position.x >= grid.length ||
    new_position.y >= grid.length ||
    new_position.x < 0 ||
    new_position.y < 0
  ) {
    const new_position = encounters.pop()
    //console.log(new_position, encounters)
    return light_path(new_position, new_position.direction, encounters)
  }
  const grid_point = grid[new_position.y][new_position.x]
  //console.log(grid_point)
  if (grid_point === undefined && encounters.length === 0) {
    return energized.size
  }
  if (grid_point === undefined) {
    const new_position = encounters.pop()
    //console.log(new_position, encounters)
    return light_path(new_position, new_position.direction, encounters)
  }
  switch (grid_point) {
    case '.':
      light_path(new_position, direction, encounters)
      break
    case '/':
      light_path(new_position, define_new_direction(direction, grid_point), encounters)
      break
    case '\\':
      light_path(new_position, define_new_direction(direction, grid_point), encounters)
      break
    case '|':
      const new_directions = define_new_directions(direction, grid_point)
      if (new_directions.first) {
        light_path(new_position, new_directions.first, [
          ...encounters,
          { ...new_position, direction: new_directions.second },
        ])
      } else {
        light_path(new_position, new_directions, encounters)
      }
      break
    case '-':
      const new_directions_dash = define_new_directions(direction, grid_point)
      if (new_directions_dash.first) {
        light_path(new_position, new_directions_dash.first, [
          ...encounters,
          { ...new_position, direction: new_directions_dash.second },
        ])
      } else {
        light_path(new_position, new_directions_dash, encounters)
      }
      break
  }
}

const energy = light_path({ x: -1, y: 0 }, 'R', [])

response.textContent = energized.size - 1
