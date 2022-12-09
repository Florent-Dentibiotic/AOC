/**
 * AOC Day 9 Part 2
 */

const movements = document.querySelector('.aoc_9').textContent.split('\n')

let tail_hoover = []
let head_position = { x: 0, y: 0 }
let tail_position1 = { x: 0, y: 0 }
let tail_position2 = { x: 0, y: 0 }
let tail_position3 = { x: 0, y: 0 }
let tail_position4 = { x: 0, y: 0 }
let tail_position5 = { x: 0, y: 0 }
let tail_position6 = { x: 0, y: 0 }
let tail_position7 = { x: 0, y: 0 }
let tail_position8 = { x: 0, y: 0 }
let tail_position9 = { x: 0, y: 0 }

let positions = [
  tail_position1,
  tail_position2,
  tail_position3,
  tail_position4,
  tail_position5,
  tail_position6,
  tail_position7,
  tail_position8,
  tail_position9,
]

const directions = {
  R: (object) => object.x++,
  L: (object) => object.x--,
  U: (object) => object.y++,
  D: (object) => object.y--,
}

const move_tail = (headPosition, tailPosition) => {
  if (
    Math.abs(headPosition.x - tailPosition.x) <= 1 &&
    Math.abs(headPosition.y - tailPosition.y) <= 1
  )
    return
  // X TAIL POSITION
  if (headPosition.x - tailPosition.x >= 1 && headPosition.y == tailPosition.y) {
    tailPosition.x++
    return
  }

  if (headPosition.x - tailPosition.x >= 1 && headPosition.y < tailPosition.y) {
    tailPosition.x++
    tailPosition.y--
    return
  }

  if (headPosition.x - tailPosition.x >= 1 && headPosition.y > tailPosition.y) {
    tailPosition.x++
    tailPosition.y++
    return
  }
  if (headPosition.x - tailPosition.x < 0 && headPosition.y == tailPosition.y) {
    tailPosition.x--
    return
  }

  if (headPosition.x - tailPosition.x < 0 && headPosition.y < tailPosition.y) {
    tailPosition.x--
    tailPosition.y--
    return
  }

  if (headPosition.x - tailPosition.x < 0 && headPosition.y > tailPosition.y) {
    tailPosition.x--
    tailPosition.y++
    return
  }
  // Y TAIL POSITION
  if (headPosition.y - tailPosition.y >= 1 && headPosition.x == tailPosition.x) {
    tailPosition.y++
    return
  }

  if (headPosition.y - tailPosition.y >= 1 && headPosition.x < tailPosition.x) {
    tailPosition.y++
    tailPosition.x++
    return
  }

  if (headPosition.y - tailPosition.y >= 1 && headPosition.x > tailPosition.x) {
    tailPosition.y++
    tailPosition.x--
    return
  }

  if (headPosition.y - tailPosition.y < 0 && headPosition.x == tailPosition.x) {
    tailPosition.y--
    return
  }

  if (headPosition.y - tailPosition.y < 0 && headPosition.x < tailPosition.x) {
    tailPosition.x--
    tailPosition.y--
    return
  }

  if (headPosition.y - tailPosition.y < 0 && headPosition.x > tailPosition.x) {
    tailPosition.y--
    tailPosition.x++
    return
  }
}

movements.forEach((move) => {
  const direction = move.split(' ')[0]
  const length = move.split(' ')[1]

  for (let i = 0; i < length; i++) {
    directions[direction](head_position)
    move_tail(head_position, tail_position1)
    move_tail(tail_position1, tail_position2)
    move_tail(tail_position2, tail_position3)
    move_tail(tail_position3, tail_position4)
    move_tail(tail_position4, tail_position5)
    move_tail(tail_position5, tail_position6)
    move_tail(tail_position6, tail_position7)
    move_tail(tail_position7, tail_position8)
    move_tail(tail_position8, tail_position9)

    tail_hoover.push(tail_position9.x + '.' + tail_position9.y)
  }
  console.log(move, head_position, tail_position1)
})

console.log(new Set(tail_hoover))

/* 
SUBMISSIONS 
- 11927
*/
