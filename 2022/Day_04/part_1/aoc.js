/**
 * AOC Day 4
 */

const sections = document
  .querySelector('.aoc_4')
  .innerHTML.split('\n')
  .filter((el) => el !== '')

const pairs = sections.map((section) => section.split(','))

let in_range = 0
let overlap = 0

pairs.forEach((pair) => {
  const first_0 = Number.parseInt(pair[0].split('-')[0])
  const last_0 = Number.parseInt(pair[0].split('-')[1])
  const first_1 = Number.parseInt(pair[1].split('-')[0])
  const last_1 = Number.parseInt(pair[1].split('-')[1])

  // FIRST PART
  // if (first_0 <= first_1 && first_1 <= last_0 && first_0 <= last_1 && last_1 <= last_0) {
  //   console.log('first', first_0, first_1, last_0, 'suite : ', first_0, last_1, last_0)
  //   return in_range++
  // }
  // if (first_1 <= first_0 && first_0 <= last_1 && first_1 <= last_0 && last_0 <= last_1) {
  //   console.log('second', first_1, first_0, last_1, 'suite : ', first_1, last_0, last_1)
  //   return in_range++
  // }

  // SECOND PART

  if (
    (last_0 >= first_1 && last_0 <= last_1) ||
    (first_0 >= first_1 && first_0 <= last_1)
  ) {
    return overlap++
  }
  if (
    (first_0 <= first_1 && first_1 <= last_0) ||
    (first_0 <= last_1 && last_1 <= last_0)
  ) {
    return overlap++
  }
})
