/**
 * AOC Day 9 Part 1
 */

const movements = document.querySelector('.aoc_9').textContent.split('\n')

let tail_hoover = []
let head_position = { x: 0, y: 0 }
let tail_position = { x: 0, y: 0 }

const directions = {
  R: (object) => object.x++,
  L: (object) => object.x--,
  U: (object) => object.y++,
  D: (object) => object.y--,
}

const move_tail = (headPosition) => {
  if (
    Math.abs(headPosition.x - tail_position.x) <= 1 &&
    Math.abs(headPosition.y - tail_position.y) <= 1
  )
    return
  // X TAIL POSITION
  if (headPosition.x - tail_position.x >= 1 && headPosition.y == tail_position.y) {
    tail_position.x++
    return
  }

  if (headPosition.x - tail_position.x >= 1 && headPosition.y < tail_position.y) {
    tail_position.x++
    tail_position.y--
    return
  }

  if (headPosition.x - tail_position.x >= 1 && headPosition.y > tail_position.y) {
    tail_position.x++
    tail_position.y++
    return
  }
  if (headPosition.x - tail_position.x < 0 && headPosition.y == tail_position.y) {
    tail_position.x--
    return
  }

  if (headPosition.x - tail_position.x < 0 && headPosition.y < tail_position.y) {
    tail_position.x--
    tail_position.y--
    return
  }

  if (headPosition.x - tail_position.x < 0 && headPosition.y > tail_position.y) {
    tail_position.x--
    tail_position.y++
    return
  }
  // Y TAIL POSITION
  if (headPosition.y - tail_position.y >= 1 && headPosition.x == tail_position.x) {
    tail_position.y++
    return
  }

  if (headPosition.y - tail_position.y >= 1 && headPosition.x < tail_position.x) {
    tail_position.y++
    tail_position.x++
    return
  }

  if (headPosition.y - tail_position.y >= 1 && headPosition.x > tail_position.x) {
    tail_position.y++
    tail_position.x--
    return
  }

  if (headPosition.y - tail_position.y < 0 && headPosition.x == tail_position.x) {
    tail_position.y--
    return
  }

  if (headPosition.y - tail_position.y < 0 && headPosition.x < tail_position.x) {
    tail_position.x--
    tail_position.y--
    return
  }

  if (headPosition.y - tail_position.y < 0 && headPosition.x > tail_position.x) {
    tail_position.y--
    tail_position.x++
    return
  }
}

let cases = 0

movements.forEach((move, index) => {
  const direction = move.split(' ')[0]
  const length = move.split(' ')[1]

  cases += Number.parseInt(length)

  for (let i = 0; i < length; i++) {
    directions[direction](head_position)
    move_tail(head_position)
    tail_hoover.push(tail_position.x + '.' + tail_position.y)
  }
  console.log(move, head_position, tail_position)
})

console.log(new Set(tail_hoover))

/* 
SUBMISSIONS 
- 6168 too high
- 4092 too low
- 4526 too low
- 6021
- 6190 

SOLUTION : 6087
*/
