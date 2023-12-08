/**
 * AOC Day 7
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')
const card_order = {
  A: 12,
  K: 11,
  Q: 10,
  J: 9,
  T: 8,
  9: 7,
  8: 6,
  7: 5,
  6: 4,
  5: 3,
  4: 2,
  3: 1,
  2: 0,
}

const lines = input.split('\n')

const setHands = (hands) => {
  return hands.map((hand) => {
    return { hand: hand.split(' ')[0].split(''), bid: hand.split(' ')[1] }
  })
}

const hands = setHands(lines)

let others = []
let HIGH_CARD = []
let ONE_PAIR = []
let TWO_PAIR = []
let THREE_OF_A_KIND = []
let FULL_HOUSE = []
let FOUR_OF_A_KIND = []
let FIVE_OF_A_KIND = []

for (const hand of hands) {
  const handSet = new Set(hand.hand)
  if (handSet.size === 1) {
    FIVE_OF_A_KIND.push(hand)
  } else if (handSet.size === 2) {
    let first = 0
    let second = 0
    hand.hand.forEach((card) => (Array.from(handSet)[0] === card ? first++ : second++))
    first === 4 || second === 4 ? FOUR_OF_A_KIND.push(hand) : FULL_HOUSE.push(hand)
  } else if (handSet.size === 3) {
    let first = 0
    let second = 0
    let third = 0
    hand.hand.forEach((card) =>
      Array.from(handSet)[0] === card
        ? first++
        : Array.from(handSet)[1] === card
        ? second++
        : third++
    )
    first === 3 || second === 3 || third === 3
      ? THREE_OF_A_KIND.push(hand)
      : TWO_PAIR.push(hand)
  } else if (handSet.size === 4) {
    ONE_PAIR.push(hand)
  } else if (handSet.size === 5) {
    HIGH_CARD.push(hand)
  } else {
    others.push(hand)
  }
}

function compareFn(cardA, cardB, index) {
  if (card_order[cardA[index]] > card_order[cardB[index]]) {
    return 1
  } else if (card_order[cardA[index]] < card_order[cardB[index]]) {
    return -1
  }
  return compareFn(cardA, cardB, index + 1)
}

const compareStrength = (cards) => {
  return cards.sort((a, b) => compareFn(a.hand, b.hand, 0))
}

const sortedHands = [
  ...compareStrength(HIGH_CARD),
  ...compareStrength(ONE_PAIR),
  ...compareStrength(TWO_PAIR),
  ...compareStrength(THREE_OF_A_KIND),
  ...compareStrength(FULL_HOUSE),
  ...compareStrength(FOUR_OF_A_KIND),
  ...compareStrength(FIVE_OF_A_KIND),
]

response.textContent = sortedHands.reduce(
  (acc, cur, index) => acc + cur.bid * (index + 1),
  0
)
