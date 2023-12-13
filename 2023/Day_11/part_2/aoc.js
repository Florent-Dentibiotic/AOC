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

const [columns, rows] = grid_to_row_and_columns(grid)

const define_galaxies_position = (grid, rows, columns) => {
  let galaxies = []
  const rows_length = rows.map((line) => (new Set(line).size === 2 ? 1 : 1000000))
  const columns_length = columns.map((line) => (new Set(line).size === 2 ? 1 : 1000000))
  for (let x = 0; x < grid.length; x++) {
    const x_value = rows_length.slice(0, x).reduce((acc, cur) => acc + cur, 0)
    for (let y = 0; y < grid[x].length; y++) {
      const y_value = columns_length.slice(0, y).reduce((acc, cur) => acc + cur, 0)

      grid[x][y] === '#' &&
        (galaxies.push({ x: x_value, y: y_value }), console.log(x_value, y_value))
    }
  }

  return galaxies
}

const galaxies = define_galaxies_position(grid, rows, columns)

console.log(galaxies)

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
    //console.log(remaining_galaxies, current_galaxie)
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
