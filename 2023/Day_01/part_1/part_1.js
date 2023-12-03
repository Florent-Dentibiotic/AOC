/**
 * AOC Day 1
 */
const part_1 = document.querySelector('#input').textContent
const response_1 = document.querySelector('#response_1')
let code = document.querySelector('#code')
const numRegex = new RegExp('[0-9]')

const sum = part_1.split('\n').reduce((acc, cur) => {
  const text = cur.split('')
  const firstNum = text.find((el) => numRegex.test(el))
  const secondNum = text.reverse().find((el) => numRegex.test(el))
  const calibration = `${firstNum}${secondNum}`
  return (acc += parseInt(calibration))
}, 0)

response_1.innerText = sum

code.textContent = `const sum = part_1.split('\\n').reduce((acc, cur) => {
  const text = cur.split('')
  const firstNum = text.find((el) => numRegex.test(el))
  const secondNum = text.reverse().find((el) => numRegex.test(el))
  const calibration = '${'firstNum'}'+'${'secondNum'}'
  return (acc += parseInt(calibration))
  }, 0)`
