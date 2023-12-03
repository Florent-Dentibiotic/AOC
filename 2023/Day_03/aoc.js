/**
 * AOC Day 2
 */
const input = document.querySelector('pre').textContent
const response_1 = document.querySelector('#response_1')
const response_2 = document.querySelector('#response_2')

/**
 * PART 1
 */

const standard_caracteres = new RegExp('[0-9]|\\.')
const number_regex = new RegExp('[0-9]+', 'g')

let input_lines = input.split('\n')

// defining the unregulars caracteres areas
let symbols_coordinates = []
for (let i = 0; i < input_lines.length; i++) {
  for (let j = 0; j < input_lines[i].length; j++) {
    standard_caracteres.test(input_lines[i][j])
      ? null
      : symbols_coordinates.push(
          `${i - 1},${j + 1}`,
          `${i - 1},${j}`,
          `${i - 1},${j - 1}`,
          `${i},${j - 1}`,
          `${i},${j}`,
          `${i},${j + 1}`,
          `${i + 1},${j + 1}`,
          `${i + 1},${j}`,
          `${i + 1},${j - 1}`
        )
  }
}

const isValid = (number_x, number_y, number_length) => {
  let coordinates = []
  for (let i = 0; i < number_length; i++) {
    coordinates.push(`${number_x},${number_y + i}`)
  }
  return coordinates.some((coordinate) => symbols_coordinates.includes(coordinate))
}

const numbersIterationValidity = (line, line_index, numbers, number_index, sum) => {
  if (number_index == numbers.length) return sum

  let total = sum
  isValid(
    line_index,
    line.indexOf(numbers[number_index]),
    numbers[number_index].length
  ) && (total += parseInt(numbers[number_index]))

  return numbersIterationValidity(
    line.replace(numbers[number_index], '.'.repeat(numbers[number_index].length)),
    line_index,
    numbers,
    number_index + 1,
    total
  )
}

let total = 0

for (let i = 0; i < input_lines.length; i++) {
  let number_in_row = input_lines[i].match(number_regex)
  let row_sum = numbersIterationValidity(input_lines[i], i, number_in_row, 0, 0)
  total += row_sum
}

response_1.textContent = total

/**
 * PART 2
 */

// Defining stars coordinates
let stars_coordinates = {}
for (let i = 0; i < input_lines.length; i++) {
  for (let j = 0; j < input_lines[i].length; j++) {
    input_lines[i][j] === '*' &&
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
for (let i = 0; i < input_lines.length; i++) {
  let number_in_row = input_lines[i].match(number_regex)
  numberCoordinates(input_lines[i], i, number_in_row, 0)
}

// final calcul for the sum of all gears
let GEARS = Object.values(stars_coordinates).reduce((acc, gear) => {
  return acc + (gear.length > 1 ? gear[0] * gear[1] : 0)
}, 0)

response_2.textContent = GEARS
