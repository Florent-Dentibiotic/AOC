/**
 * AOC Day 7
 */

let folders = { '/0': 0 }

const directories = document.querySelector('.aoc_7').textContent.split('\n')

let current_folder = '/6613'
let parents_list = []
let line_index = 6613

// useless counters :
let ls_counter = 0
let dir_counter = 0

for (const line of directories) {
  if (line.includes('$ cd')) {
    let this_folder = line.split(' ')[2]
    if (this_folder === '..') {
      current_folder = parents_list[parents_list.indexOf(current_folder) - 1]
      parents_list.pop()
    } else {
      current_folder = this_folder + line_index
      parents_list.push(current_folder)
      folders = { ...folders, [current_folder]: 0 }
    }
  } else if (line.includes('$ ls')) {
    ls_counter++
  } else if (line.includes('dir ')) {
    dir_counter++
  } else {
    const file_details = line.split(' ')
    const file_size = Number.parseInt(file_details[0])

    parents_list.forEach((folder) => {
      folders[folder] += file_size
    })
  }
  line_index++
}

let folders_sum = 0
let big_folders = []
Object.values(folders).forEach((value) => value < 100000 && (folders_sum += value))

const min_folder =
  70000000 -
  Object.values(folders).forEach((value) => value >= 532950 && big_folders.push(value))

console.log(folders_sum, Math.min(...big_folders))

// SUBMISSIONS : 4979371, 1007861, 1349118
