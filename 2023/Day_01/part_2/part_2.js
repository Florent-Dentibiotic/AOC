/**
 * AOC Day 1
 */
const part_2 = document.querySelector('pre').textContent
const response_2 = document.querySelector('#response_2')

const textNum = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
const textToNum = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

const sum2 = part_2.split('\n').reduce((acc, cur) => {
  let firstIndex = cur.length
  let lastIndex = 0
  let firstNum = ''
  let lastNum = ''
  textNum.forEach((num) => {
    cur.indexOf(num) > -1 && cur.indexOf(num) < firstIndex
      ? ((firstNum = num), (firstIndex = cur.indexOf(num)))
      : null
    cur.lastIndexOf(num) > -1 && cur.lastIndexOf(num) >= lastIndex
      ? ((lastNum = num), (lastIndex = cur.lastIndexOf(num)))
      : null
  })
  const calibration = `${isNaN(firstNum) ? textToNum[firstNum] : firstNum}${
    isNaN(lastNum) ? textToNum[lastNum] : lastNum
  }`
  return (acc += parseInt(calibration))
}, 0)

response_2.innerText = sum2
