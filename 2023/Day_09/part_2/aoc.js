/**
 * AOC Day 1
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')
const number_regex = new RegExp('-?[0-9]+', 'g')
const sequences = input.split('\n').map((line) => line.match(number_regex))

// calculer la différence entre les num de la séquence :
const defineGap = (sequence) => {
  let gaps = []
  for (let i = 0; i < sequence.length - 1; i++) {
    gaps.push(sequence[i + 1] - sequence[i])
  }
  return gaps
}

const definePreviousValue = (sequence, gap) => {
  //console.log(sequence[0], gap)
  return Number(sequence[0]) - gap
}

const recursivelyFindSequence = (sequences, index, gap) => {
  console.log(sequences, index, gap)
  if (gap || gap === 0) {
    //return console.log('gap', sequences, index, gap)
    if (index === 0) return definePreviousValue(sequences[index], gap)
    return recursivelyFindSequence(
      sequences,
      index - 1,
      definePreviousValue(sequences[index], gap)
    )
  }
  //console.log(sequences, index, gap)
  const gaps = defineGap(sequences[index])
  //console.log(gaps[gaps.length - 1])
  const size = new Set(gaps).size
  if (size === 1)
    return recursivelyFindSequence(sequences, index, Number(gaps[gaps.length - 1]))
  const newSequence = [...sequences, gaps]
  return recursivelyFindSequence(newSequence, index + 1)
}

const extrapolate = sequences.map((sequence, index) => {
  console.log(index)
  return recursivelyFindSequence([sequence], 0)
})

response.textContent = extrapolate.reduce((acc, cur) => acc + cur, 0)

console.log(extrapolate)

/*

*/
