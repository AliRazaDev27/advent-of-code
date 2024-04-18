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
for (let content of file) {
  let data = content.split(' ');
  if (info[data[2].slice(0, -1)] == data[3].slice(0, -1)) {
    if (info[data[4].slice(0, -1)] == data[5].slice(0, -1)) {
      if (info[data[6].slice(0, -1)] == data[7].slice(0, -1)) {
        console.log("found:", content)
      }
    }
  }
}
