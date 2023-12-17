/**
 * AOC Day 2
 */
const exemple = document.querySelector('#exemple').textContent
const input = document.querySelector('#input').textContent
const response = document.querySelector('#response')

const rectangles = input.split('\n').map((line) => line.split('x').sort((a, b) => a - b))

const paper_dimension = (l, w, h) => {
  return 2 * l + 2 * w + l * w * h
}

const answer = rectangles.reduce(
  (acc, rectangle) => acc + paper_dimension(rectangle[0], rectangle[1], rectangle[2]),
  0
)

response.textContent = answer
