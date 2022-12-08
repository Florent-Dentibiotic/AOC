/**
 * AOC Day 1
 */
const input = document.querySelector('pre').textContent
const elves = input.split('\n\n')
const each_elves = elves.map((elve) =>
  elve
    .split('\n')
    .reduce(
      (accumulator, currentValue) =>
        Number.parseInt(accumulator) + Number.parseInt(currentValue),
      0
    )
)
const max_calories = Math.max(...each_elves)
const sort_elves = each_elves.sort(function compareNumbers(a, b) {
  return a - b
})
const top_three =
  sort_elves[sort_elves.length - 1] +
  sort_elves[sort_elves.length - 2] +
  sort_elves[sort_elves.length - 3]
