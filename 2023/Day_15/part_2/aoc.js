/**
 * AOC Day 15
 */
const input = document.querySelector('#input').textContent
const exemple = document.querySelector('#exemple').textContent
const response = document.querySelector('#response')

const entries = input.split(',')

const define_result = (sequence, current_value, index) => {
  current_value += sequence.charCodeAt(index)
  current_value *= 17
  current_value = current_value % 256
  if (index + 1 === sequence.length) return current_value
  return define_result(sequence, current_value, index + 1)
}

const boxes = new Map()

const minus_or_equal = (sequence, index) => {
  //console.log(boxes, index)
  if (sequence.includes('=')) {
    //console.log(sequence)
    const box_number = define_result(sequence.split('=')[0], 0, 0)
    let box = boxes.get(box_number)

    if (!box) {
      boxes.set(box_number, [
        { label: sequence.split('=')[0], lens: sequence.split('=')[1] },
      ])
    } else {
      const box_index = box.findIndex((lens) => lens.label === sequence.split('=')[0])
      //console.log(sequence.split('='), box_index)
      if (box_index !== -1) {
        //console.log(sequence.split('='), box_index)
        box.splice(box_index, 1, {
          label: sequence.split('=')[0],
          lens: sequence.split('=')[1],
        })
        //console.log(sequence.split('='), new_box)
        boxes.set(box_number, box)
      } else {
        box.push({
          label: sequence.split('=')[0],
          lens: sequence.split('=')[1],
        })
        boxes.set(box_number, box)
      }
    }

    return {
      box: define_result(sequence.split('=')[0], 0, 0),
      label: sequence.split('=')[0],
      lens: sequence.split('=')[1],
      sign: '=',
    }
  }

  const box_number = define_result(sequence.split('-')[0], 0, 0)
  let box = boxes.get(box_number)
  if (box) {
    const box_index = box.findIndex((lens) => lens.label === sequence.split('-')[0])
    if (box_index > -1) {
      box.splice(box_index, 1)
      boxes.set(box_number, box)
    }
  }

  return {
    box: define_result(sequence.split('-')[0], 0, 0),
    label: sequence.split('-')[0],
    sign: '-',
  }
}

entries.map((string, index) => minus_or_equal(string, index))
let result = 0

boxes.forEach((el, index) => {
  const sum = el.map((cur, id) => Number(cur.lens) * (index + 1) * (id + 1), 1)
  console.log(sum)
  sum.reduce((acc, cur) => acc + cur, 0)
  result += sum.reduce((acc, cur) => acc + cur, 0)
})

console.log(result)
