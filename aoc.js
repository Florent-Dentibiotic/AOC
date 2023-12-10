const main = document.querySelector('#main')

const createYearLinks = (year, length = 25) => {
  const ul = document.createElement('ul')
  main.appendChild(ul)
  for (let i = 1; i < length + 1; i++) {
    const li = document.createElement('li')
    li.innerHTML = `<p>${`${year} Jour ${i} : `}<a href='${year}/Day_${
      i < 10 ? `0${i}` : i
    }/part_1/index.html'>Part 1</a> - <a href='${year}/Day_${
      i < 10 ? `0${i}` : i
    }/part_2/index.html'>Part 2</a></p>`
    ul.appendChild(li)
  }
}

createYearLinks(2015, 1)
createYearLinks(2022, 12)
createYearLinks(2023, 10)
