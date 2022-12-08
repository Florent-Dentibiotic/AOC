/**
 * AOC Day 3
 */

const rucksack = document
  .querySelector('.aoc_3')
  .textContent.split('\n')
  .filter((el) => el !== '')

// part 1
const rucksacks_1 = rucksack.map((comparts) => comparts.slice(0, comparts.length / 2))
const rucksacks_2 = rucksack.map((comparts) => comparts.slice(-comparts.length / 2))
let shared_letters = []

const isIncluded = (rucksacks_1, rucksacks_2) => {
  for (let j = 0; j < rucksacks_1.length; j++) {
    if (rucksacks_2.includes(rucksacks_1[j])) {
      shared_letters.push(rucksacks_1[j])
      return
    }
  }
}

for (let i = 0; i < rucksacks_1.length; i++) {
  isIncluded(rucksacks_1[i], rucksacks_2[i])
}

const alphabet = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const sum = shared_letters.reduce(
  (acc, cur) => acc + Number.parseInt(alphabet.indexOf(cur)),
  0
)

// part 2 :
let shared_three = []

const isIncludedThree = (rucksacks_1, rucksacks_2, rucksacks_3) => {
  for (let j = 0; j < rucksacks_1.length; j++) {
    if ([rucksacks_2, rucksacks_3].every((array) => array.includes(rucksacks_1[j]))) {
      shared_three.push(rucksacks_1[j])
      return
    }
  }
}
let badge_priorities = []

for (let i = 0; i < rucksack.length / 3; i++) {
  isIncludedThree(rucksack[i * 3], rucksack[i * 3 + 1], rucksack[i * 3 + 2])
}

const sum_2 = shared_three.reduce(
  (acc, cur) => acc + Number.parseInt(alphabet.indexOf(cur)),
  0
)

console.log(sum, sum_2)
