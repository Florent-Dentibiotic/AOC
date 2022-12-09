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

for (let index = 0; index < threes_rows.length; index++) {
  for (let j_index = 0; j_index < threes_rows[index].length; j_index++) {
    threes_coordinates[index + '.' + j_index] = threes_rows[index][j_index]
  }
}

console.log(threes_coordinates)
