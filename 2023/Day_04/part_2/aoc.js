/**
 * AOC Day 4 Part_2
 */
const input = document.querySelector('pre').textContent
const response = document.querySelector('#response')
const games = input.split('\n')
const number_regex = new RegExp('[0-9]+', 'g')

let winning_copies = []

games.map((game) => {
  const all_num = game.match(number_regex).splice(1)
  const unique = new Set(all_num).size
  let repeated = all_num.length - unique
  winning_copies.push(repeated)
})

let scratchcards = []

for (let i = 0; i < games.length; i++) {
  scratchcards.push(1)
}

winning_copies.map((game, index) => {
  for (let i = 0; i < game; i++) {
    scratchcards[i + index + 1] += scratchcards[index]
  }
})

console.log(scratchcards)

response.textContent = scratchcards.reduce((acc, cur) => acc + cur, 0)
