/**
 * AOC Day 5
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')
const number_regex = new RegExp('[0-9]+', 'g')

const lines = input.split('\n')

let races = []

const times = lines[0].match(number_regex)
const distance = lines[1].match(number_regex)
times.map((time, index) => races.push({ time: time, distance: distance[index] }))

const defineRaceResult = (time, hold, distance, results) => {
  if (hold === time) return results
  const race = hold * 1 * (time - hold)
  if (race > distance) return defineRaceResult(time, hold + 1, distance, results + 1)
  return defineRaceResult(time, hold + 1, distance, results)
}

const results = races.map((race) =>
  defineRaceResult(parseInt(race.time), 0, race.distance, 0)
)

response.textContent = results.reduce((acc, cur) => acc * cur, 1)
