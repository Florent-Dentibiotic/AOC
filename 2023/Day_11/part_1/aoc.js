/**
 * AOC Day 11
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')
const sharp_regex = new RegExp('#', 'g')

const grid = input.split('\n')

const grid_to_row_and_columns = (grid) => {
  let rows = grid.map((line) => line.split(''))
  let columns = []
  for (let i = 0; i < grid.length; i++) {
    columns.push([])
  }
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      columns[y].push(grid[x][y])
    }
  }
  return [columns, rows]
}

const define_new_grid = (rows, columns) => {
  let new_grid = [...rows]
  let row_index = 0
  let columns_index = 0
  const rows_length = rows.map((line) => (new Set(line).size === 2 ? 1 : 2))
  const columns_length = columns.map((line) => (new Set(line).size === 2 ? 1 : 2))
  columns_length.forEach((col, index) => {
    if (col === 2) {
      new_grid.map((line) => line.splice(columns_index + index, 0, '.'))
      columns_index++
    }
  })
  rows_length.forEach((row, index) => {
    if (row === 2) {
      new_grid.splice(row_index + index, 0, ['.', '.'])
      row_index++
    }
  })
  return new_grid
}

const [columns, rows] = grid_to_row_and_columns(grid)

const define_galaxies_position = (grid) => {
  let galaxies = []

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      grid[x][y] === '#' && galaxies.push({ x, y })
    }
  }

  return galaxies
}

let corrected_grid = define_new_grid(rows, columns)

const galaxies = define_galaxies_position(corrected_grid)

const shortest_path = (first_galaxie, second_galaxie) => {
  return (
    Math.abs(first_galaxie.x - second_galaxie.x) +
    Math.abs(first_galaxie.y - second_galaxie.y)
  )
}

const sum_all_path = (galaxies) => {
  let remaining_galaxies = [...galaxies]
  let current_galaxie = remaining_galaxies[0]
  let path_sum = 0
  while (remaining_galaxies.length > 1) {
    path_sum += remaining_galaxies.reduce(
      (acc, cur) => acc + shortest_path(current_galaxie, cur),
      0
    )
    remaining_galaxies.shift()
    current_galaxie = remaining_galaxies[0]
  }
  return path_sum
}

response.textContent = sum_all_path(galaxies)
