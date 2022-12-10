/**
 * AOC Day 8 Part 2
 */

const threes = document.querySelector('.aoc_8').textContent.split('\n')

const borders = (threes.length + threes[0].length - 2) * 2

const threes_rows = document.querySelector('.aoc_8').textContent.split('\n')

let threes_columns_object = {}

for (let i = 0; i < threes_rows.length; i++) {
  threes_columns_object = { ...threes_columns_object, [i]: '' }
}

threes_rows.forEach((row) => {
  for (let i = 0; i < row.length; i++) {
    threes_columns_object[i] += row[i]
  }
})

let threes_coordinates = {}
let threes_view = {}

for (let index = 0; index < threes_rows.length; index++) {
  for (let j_index = 0; j_index < threes_rows[index].length; j_index++) {
    threes_coordinates[index + '.' + j_index] = Number.parseInt(
      threes_rows[j_index][index]
    )
    threes_view[index + '.' + j_index] = 0
  }
}

let row_visibles = {}
let column_visibles = {}
let line = 0
let max = 0

Object.entries(threes_coordinates).forEach(([three, value]) => {
  const threeX = three.split('.')[0]
  const threeY = three.split('.')[1]
  if (threeX == 0 || threeX == 98 || threeY == 0 || threeY == 98) return
  const left_part = threes_rows[threeY].slice(0, threeX).split('').reverse()
  const right_part = threes_rows[threeY].slice(Number.parseInt(threeX) + 1)
  const upper_part = threes_columns_object[threeX].slice(0, threeY).split('').reverse()
  const lower_part = threes_columns_object[threeX].slice(Number.parseInt(threeY) + 1)
  let left_part_view = -1
  let left_part_i = 0
  let left_threes = 0
  let left_length = left_part.length
  while (left_length > 0 && left_part_view < value) {
    left_length--
    left_threes++
    left_part_view = left_part[left_part_i]
    left_part_i++
  }
  let right_part_view = -1
  let right_part_i = 0
  let right_threes = 0
  let right_length = right_part.length
  while (right_length > 0 && right_part_view < value) {
    right_length--
    right_threes++
    right_part_view = right_part[right_part_i]
    right_part_i++
  }
  let upper_part_view = -1
  let upper_part_i = 0
  let upper_threes = 0
  let upper_length = upper_part.length
  while (upper_length > 0 && upper_part_view < value) {
    upper_length--
    upper_threes++
    upper_part_view = upper_part[upper_part_i]
    upper_part_i++
  }
  let lower_part_view = -1
  let lower_part_i = 0
  let lower_threes = 0
  let lower_length = lower_part.length
  while (lower_length > 0 && lower_part_view < value) {
    lower_length--
    lower_threes++
    lower_part_view = lower_part[lower_part_i]
    lower_part_i++
  }
  console.log(three, left_threes, upper_threes, right_threes, lower_threes, right_length)
  //console.log(three, value, upper_part, lower_part)
  threes_view[threeX + '.' + threeY] =
    left_threes * right_threes * upper_threes * lower_threes
})

console.log(Math.max(...Object.values(threes_view)))

/**
 * SUBMISSIONS :
 * 143
 * 1050000 too high
 * 6247500
 * 972405 too high
 */
