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
    threes_coordinates[index + '.' + j_index] = 0
  }
}

console.log(threes_coordinates)

let row_visibles = {}
let column_visibles = {}
let line = 0
let max = 0

// ROW VISIBLES
for (let i = 0; i < threes_rows.length; i++) {
  //row_visibles = { ...row_visibles, [i]: [] }
  let taller = -1
  let visible_in_range = []
  threes_rows[i].split('').forEach((tree, index) => {
    if (Number.parseInt(tree) > taller) {
      const y = index
      threes_coordinates[i + '.' + y] += Number.parseInt(y)
      taller = Number.parseInt(tree)
    }
  })
  // taller = -1
  // threes_rows[i]
  //   .split('')
  //   .reverse()
  //   .forEach((tree, index) => {
  //     if (Number.parseInt(tree) > taller) {
  //       const y = 98 - index
  //       row_visibles[i].push(y + '.' + i), (taller = Number.parseInt(tree))
  //     }
  //   })
}

console.log(threes_coordinates)
// const threes_columns = Object.values(threes_columns_object)
// // COLUMN VISIBLES
// for (let i = 0; i < threes_columns.length; i++) {
//   column_visibles = { ...column_visibles, [i]: [] }
//   let taller = -1
//   threes_columns[i].split('').forEach((tree, index) => {
//     if (Number.parseInt(tree) > taller) {
//       const y = index
//       column_visibles[i].push(i + '.' + y), (taller = Number.parseInt(tree))
//     }
//   })
//   taller = -1
//   threes_columns[i]
//     .split('')
//     .reverse()
//     .forEach((tree, index) => {
//       if (Number.parseInt(tree) > taller) {
//         const y = 98 - index
//         column_visibles[i].push(i + '.' + y), (taller = Number.parseInt(tree))
//       }
//     })
// }

// console.log('row', row_visibles)
// console.log('column', column_visibles)

//console.log(row_visibles, column_visibles)

const visible_in_row = Object.values(row_visibles)
const visible_in_col = Object.values(column_visibles)

//console.log(visible_in_row, visible_in_col)

let visibles = new Set([...visible_in_row.flat(), ...visible_in_col.flat()].sort())

console.log(visibles)
