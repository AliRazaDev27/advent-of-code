let file = require('fs');
let data = file.readFileSync('puzzle.txt', 'utf8').split('\n').map(x => x.split(' '));
data.pop();
let length = data.length;
const map = new Map();
for (let i = 0; i < length; i++) {

  if (map.has(data[i][0])) {
    let temp = map.get(data[i][0]);
    temp.set(data[i][2], data[i][data[i].length - 1]);
    map.set(data[i][0], temp);
  }
  else {
    let temp = new Map();
    temp.set(data[i][2], data[i][data[i].length - 1]);
    map.set(data[i][0], temp);
  }
  if (map.has(data[i][2])) {
    let temp = map.get(data[i][2]);
    temp.set(data[i][0], data[i][data[i].length - 1]);
    map.set(data[i][2], temp);
  }
  else {
    let temp = new Map();
    temp.set(data[i][0], data[i][data[i].length - 1]);
    map.set(data[i][2], temp);
  }
}
let minDistance = 999999;
let maxDistance = 0;
const allPaths = [];

let keys = map.keys();
for (let key of keys) {
  const visited = new Set();
  visited.add(key);
  getDistance(key, 0, visited);
}
function getDistance(nextCity, distanceTraveled, citiesVisted) {
  const myCitiesVisited = new Set(citiesVisted);
  const myDistanceTraveled = distanceTraveled;
  if (myCitiesVisited.size === 8) {
    const temp = Array.from(myCitiesVisited);
    allPaths.push(temp);
  }
  let temp = map.get(nextCity);
  for (let nextCity of temp.keys()) {
    if (!myCitiesVisited.has(nextCity)) {
      myCitiesVisited.add(nextCity);
      getDistance(nextCity, myDistanceTraveled + Number(temp.get(nextCity)), myCitiesVisited);
      myCitiesVisited.delete(nextCity);
    }
  }
}
let arrayLength = allPaths.length;
for (let i = 0; i < arrayLength; i++) {
  let path = allPaths[i];
  let distance = 0;
  let startingCity = path[0];
  for (let j = 1; j < path.length; j++) {
    let out = map.get(startingCity).get(path[j]);
    distance += Number(out);
    startingCity = path[j];
  }
  if (distance <= minDistance) {
    minDistance = distance
  }
  if (distance >= maxDistance) {
    maxDistance = distance
  }
}
console.log(`minDistance: ${minDistance}`)
console.log(`maxDistance: ${maxDistance}`)
