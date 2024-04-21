const file = require('fs').readFileSync('puzzle.txt', 'utf-8').split('\n');
const molecule = file.pop();
const map = new Map();
for (let line of file) {
  let i = line.split(" ")
  if (map.has(i[0])) {
    const temp = map.get(i[0])
    temp.push(i[2])
    map.set(i[0], temp)
  }
  else {
    const temp = [i[2]]
    map.set(i[0], temp)
  }
}
const set = new Set();
for (let key of map.keys()) {
  let temp = findAllIndex(key)
  for (let code of map.get(key)) {
    for (let i = 0; i < temp.length; i++) {
      let currentIndex = temp[i];
      let newMolecule = molecule.slice(0, currentIndex) + code + molecule.slice(currentIndex + key.length)
      set.add(newMolecule)
    }
  }
}
// }
function findAllIndex(str) {
  const temp = [];
  const length = str.length;
  let foundAll = false;
  let startingIndex = 0;
  while (!foundAll) {
    let index = molecule.indexOf(str, startingIndex);
    if (index == -1) { foundAll = true }
    else {
      temp.push(index);
      startingIndex = index + length;
    }
  }
  return temp
}
console.log(set.size)
