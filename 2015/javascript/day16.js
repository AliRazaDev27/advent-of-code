const file = require('fs').readFileSync('puzzle.txt', 'utf8').split('\n');
file.pop();
const info = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
}
const array = []
for (let content of file) {
  let data = content.split(' ');
  const obj = {}
  obj.key = data[1].slice(0, -1);
  obj[data[2].slice(0, -1)] = Number(data[3].slice(0, -1));
  obj[data[4].slice(0, -1)] = Number(data[5].slice(0, -1));
  obj[data[6].slice(0, -1)] = Number(data[7]);
  array.push(obj);
}
for (let j of array) {
  let count = 0;
  for (let key in j) {
    if (key == 'key') {
      continue
    }
    if (key == 'cats') {
      if (j[key] > info[key]) {
        count++
      }
    }
    if (key == 'trees') {
      if (j[key] > info[key]) {
        count++
      }
    }
    if (key == 'pomeranians') {
      if (j[key] < info[key]) {
        count++
      }
    }
    if (key == 'goldfish') {
      if (j[key] < info[key]) {
        count++
      }
    }
    if (j[key] == info[key]) {
      count++
    }
  }
  if (count > 2) {
    console.log(count, j)
  }
}

