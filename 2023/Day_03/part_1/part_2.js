/**
 * AOC Day 2
 */
const input_2 = document.querySelector('pre').textContent.split('\n')
const response_2 = document.querySelector('#response_2')

/**
 * PART 2
 */

// Defining stars coordinates
let stars_coordinates = {}
for (let i = 0; i < input_2.length; i++) {
  for (let j = 0; j < input_2[i].length; j++) {
    input_2[i][j] === '*' &&
      (stars_coordinates = { ...stars_coordinates, [`${i},${j}`]: [] })
  }
}

// Is the number next to a star => if yes return star coordinates
const isNextToAStar = (number_x, number_y, number_length) => {
  let coordinates = []
  for (let i = 0; i < number_length; i++) {
    coordinates.push(
      `${number_x},${number_y + i - 1}`,
      `${number_x},${number_y + i}`,
      `${number_x},${number_y + i + 1}`,
      `${number_x - 1},${number_y + i - 1}`,
      `${number_x - 1},${number_y + i}`,
      `${number_x - 1},${number_y + i + 1}`,
      `${number_x + 1},${number_y + i - 1}`,
      `${number_x + 1},${number_y + i}`,
      `${number_x + 1},${number_y + i + 1}`
    )
  }
  return Object.keys(stars_coordinates).find((position) => coordinates.includes(position))
}

// testing each numbe recurcively and replacing it by '.' to don't intecept twice the same number
const numberCoordinates = (line, line_index, numbers, number_index) => {
  if (number_index == numbers.length) return
  const star = isNextToAStar(
    line_index,
    line.indexOf(numbers[number_index]),
    numbers[number_index].length
  )
  if (star)
    stars_coordinates = {
      ...stars_coordinates,
      [star]: [...stars_coordinates[star], numbers[number_index]],
    }
  return numberCoordinates(
    line.replace(numbers[number_index], '.'.repeat(numbers[number_index].length)),
    line_index,
    numbers,
    number_index + 1
  )
}

// lauching the test for each line
for (let i = 0; i < input_2.length; i++) {
  let number_in_row = input_2[i].match(number_regex)
  numberCoordinates(input_2[i], i, number_in_row, 0)
}

// final calcul for the sum of all gears
let GEARS = Object.values(stars_coordinates).reduce((acc, gear) => {
  return acc + (gear.length > 1 ? gear[0] * gear[1] : 0)
}, 0)

response_2.textContent = GEARS
