/**
 * AOC Day 5
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')
const number_regex = new RegExp('[0-9]+', 'g')

const lines = input.split('\n')

let races = []

const times = lines[0].match(number_regex).reduce((acc, cur) => acc + cur, 0)
const distance = lines[1].match(number_regex).reduce((acc, cur) => acc + cur, 0)
races.push({ time: times, distance: distance })

const defineFirstPositiveResult = (time, hold, distance) => {
  const race = hold * 1 * (time - hold)
  if (race > distance) return hold
  return defineFirstPositiveResult(time, hold + 1, distance)
}

const defineLastPositiveResult = (time, hold, distance) => {
  console.log(time, hold, distance)
  const race = hold * 1 * (time - hold)
  if (race > distance) return hold
  return defineLastPositiveResult(time, hold - 1, distance)
}

const results = races
  .map((race) => {
    return {
      min: defineFirstPositiveResult(
        parseInt(race.time),
        10740000,
        parseInt(race.distance)
      ),
      max: defineLastPositiveResult(
        parseInt(race.time),
        37244000,
        parseInt(race.distance)
      ),
    }
  })
  .reduce((acc, cur) => acc * (cur.max - cur.min + 1), 1)

response.textContent = results
