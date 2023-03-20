/**
 * AOC Day 11 Part 2
 */

//const monkeys = document.querySelector('.aoc_11').textContent.split('\n\n')
const monkeys = document.querySelector('.aoc_11_sample').textContent.split('\n\n')

class Monkey {
  constructor(name, items, operator, operation, test, ifTrue, ifFalse) {
    this.name = name
    this.items = items
    this.operation = (old) => {
      let calc = 1
      if (operation === '*') {
        calc = Number.isNaN(operator) ? old * old : old * operator
      }
      if (operation === '+') {
        calc = Number.parseInt(old) + Number.parseInt(operator)
      }
      const result = Math.floor(calc / 3)
      //console.log(Math.floor((result / 3) % test), Math.floor(result / 3), test)
      return result % test
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

//console.log(monkeyList)

for (let i = 0; i < 20; i++) {
  Object.values(monkeyList).map((monkey) => {
    monkey.items.map((item) => {
      const calculus = monkey.operation(item)

      //console.log(calculus % monkey.test === 0, calculus % monkey.test)
      return calculus % monkey.test === 0
        ? monkeyList[monkey.ifTrue].items.push(calculus)
        : monkeyList[monkey.ifFalse].items.push(calculus)
    })
    //console.log(monkey.name, monkey.items.length, 'inspected :', monkey.inspected)
    monkey.inspected += monkey.items.length
    //console.log(monkey.name, monkey.items.length, 'inspected :', monkey.inspected)
    monkey.items = []
  })
  //console.log('turn', i + 1, monkeyList)
}

let inspectedList = []
Object.values(monkeyList).forEach((monkey) => inspectedList.push(monkey.inspected))

console.log(inspectedList)

// inspectedList.sort(function (a, b) {
//   return b - a
// })

/**
 * ROUNDS
 */

const rounds = document.querySelector('.aoc_11_rounds').textContent.split('== After ')
rounds.shift()

//console.log(rounds.map((round) => round.split('\n')))

/*
let step = 1

const steps = 2 + 'step' * 19
(99-2)/19
(5204-2)/999
(10419-2)/1999
*/

/*
20 turns : 
- obj     [99, 97, 8, 103]
- /2 & *2[ 100, 96, 8, 104 ]
- *PI    [ 98, 98, 11, 107 ]
- *3     [ 98, 98, 8, 102 ]
- *2    [ 94, 102, 10, 102 ]
- no op [ 100, 96, 9, 104 ]
- /2    [ 101, 95, 10, 104 ]
- /3    [ 101, 95, 7, 105 ]
- /4    [ 96, 100, 5, 100 ]
- /6    [ 96, 100, 3, 99 ]
- /7   [ 32, 164, 157, 27 ]
- /9   [ 16, 180, 175, 17 ]
- /13  [ 20, 176, 180, 15 ]
*/
