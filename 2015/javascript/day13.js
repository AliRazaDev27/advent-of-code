const file = require('fs').readFileSync('puzzle.txt', 'utf8').split('\n');
const percom = require('percom');
// const file = [
//   "Alice would gain 54 happiness units by sitting next to Bob.",
//   "Alice would lose 79 happiness units by sitting next to Carol.",
//   "Alice would lose 2 happiness units by sitting next to David.",
//   "Bob would gain 83 happiness units by sitting next to Alice.",
//   "Bob would lose 7 happiness units by sitting next to Carol.",
//   "Bob would lose 63 happiness units by sitting next to David.",
//   "Carol would lose 62 happiness units by sitting next to Alice.",
//   "Carol would gain 60 happiness units by sitting next to Bob.",
//   "Carol would gain 55 happiness units by sitting next to David.",
//   "David would gain 46 happiness units by sitting next to Alice.",
//   "David would lose 7 happiness units by sitting next to Bob.",
//   "David would gain 41 happiness units by sitting next to Carol."
// ]
file.pop();
const map = new Set();
for (let i of file) {
  const temp = i.split(' ');
  map.add(temp[0]);
}
map.add("ali");

const array = Array.from(map);
const indices = new Map();
for (let i = 0; i < array.length; i++) {
  indices.set(array[i], i);
}

const happiness = new Array(map.size);
for (let i = 0; i < map.size; i++) {
  happiness[i] = new Array(map.size);
  for (let j = 0; j < map.size; j++) {
    happiness[i][j] = 0;
  }
}
for (let i of file) {
  const temp = i.split(' ');
  let first = indices.get(temp[0]);
  let second = indices.get((temp[temp.length - 1]).slice(0, -1));
  let value = temp[3];
  let sign = temp[2];
  if (sign === 'lose') {
    value = -value;
  }
  // console.log(first, second, value)
  happiness[first][second] = value;
}
function getHappiness(first, second) {
  if(first=="ali" || second=="ali"){
    return 0;
  }
  let firstIndex = indices.get(first);
  let secondIndex = indices.get(second);
  return Number(happiness[firstIndex][secondIndex])
}
let maxHappiness = 0;
let firstItem = array.shift();
const permutations = percom.per(array, map.size - 1);
for (let i = 0; i < permutations.length; i++) {
  let perHappiness = 0;
  let sample = permutations[i];
  let train = sample.unshift(firstItem);
  for (let j = 0; j < sample.length; j++) {
    if(j === 0){
      perHappiness += getHappiness(sample[j], sample[j+1]);
      perHappiness += getHappiness(sample[j], sample[sample.length -1]);
    }
    else if (j === sample.length - 1) {
      perHappiness += getHappiness(sample[j], sample[0]);
      perHappiness += getHappiness(sample[j], sample[j-1]);
    }
    else {
      perHappiness += getHappiness(sample[j], sample[j + 1]);
      perHappiness += getHappiness(sample[j], sample[j-1]);
    }
  }
  console.log(`perHappiness: ${perHappiness}`)
  if (perHappiness > maxHappiness) {
    maxHappiness = perHappiness
  }
}
console.log(`maxHappiness: ${maxHappiness} typeof: ${typeof maxHappiness}`)
