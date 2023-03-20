/**
 * AOC Day 11 Part 1
 */

const monkeys = document.querySelector('.aoc_11').textContent.split('\n\n')
//const monkeys = document.querySelector('.aoc_11_sample').textContent.split('\n\n')

class Monkey {
  constructor(name, items, operator, operation, test, ifTrue, ifFalse) {
    this.name = name
    this.items = items
    this.operation = (old) => {
      let result
      if (operation === '*') {
        result = Number.isNaN(operator)
          ? Math.floor((old * old) / 3)
          : Math.floor((old * operator) / 3)
      }
      if (operation === '+') {
        result = Math.floor((Number.parseInt(old) + Number.parseInt(operator)) / 3)
      }
      console.log(result)
      return result
    }

    this.test = test
    this.ifTrue = ifTrue
    this.ifFalse = ifFalse
    this.inspected = 0
  }
}

let monkeyList = {}

monkeys.forEach((monkey) => {
  const monkeyInfos = monkey.split('\n')
  const number = monkeyInfos[0][7]
  const items = monkeyInfos[1]
    .slice(17)
    .split(',')
    .map((el) => el.trim())
  const operation = monkeyInfos[2].slice(19).split(' ')[1]
  const operator = monkeyInfos[2].slice(19).split(' ')[2]
  const test = monkeyInfos[3].slice(21)
  const ifTrue = monkeyInfos[4].slice(-1)
  const ifFalse = monkeyInfos[5].slice(-1)
  monkeyList = {
    ...monkeyList,
    [number]: new Monkey(
      number,
      items,
      Number.parseInt(operator),
      operation,
      Number.parseInt(test),
      ifTrue,
      ifFalse
    ),
  }
})

console.log(monkeyList)

for (let i = 0; i < 20; i++) {
  Object.values(monkeyList).map((monkey) => {
    //console.log(monkey.items.length)
    monkey.items.map((item) => {
      const calculus = monkey.operation(item)

      return calculus % monkey.test === 0
        ? monkeyList[monkey.ifTrue].items.push(calculus)
        : monkeyList[monkey.ifFalse].items.push(calculus)
    })

    //console.log(monkey.items)
    monkey.inspected += monkey.items.length
    monkey.items = []
  })
  console.log('turn', i + 1, ':', monkeyList)
}

let inspectedList = []

Object.values(monkeyList).forEach((monkey) => inspectedList.push(monkey.inspected))

inspectedList.sort(function (a, b) {
  return b - a
})

console.log(inspectedList[0] * inspectedList[1])
/* SUBMISSIONS :
 
- 62750 too low
- 63001 too low
- 94860 false
- 106272
 */
