let file = require("fs").readFileSync("puzzle.txt", "utf8");
const data = JSON.parse(file);
let count = 0
function solve(data) {
  let keys = Object.keys(data);
  for (let key of keys) {
    if (typeof data[key] == "number") {
      count = count + data[key]
    }
    else if (Array.isArray(data[key])) {
      forArray(data[key])
    }
    else if (typeof data[key] == "object") {
      forObject(data[key])
    }
  }
}
function forArray(data) {
  for (let i of data) {
    if (typeof i == "number") {
      count = count + i
    }
    else if (Array.isArray(i)) {
      forArray(i)
    }
    else if (typeof i == "object") {
      forObject(i)
    }
  }
}
function forObject(data) {
  if (!checkForRed(data)) {
    let keys = Object.keys(data);
    for (let key of keys) {
      // console.log(key)
      if (typeof data[key] == "number") {
        count = count + data[key]
      }
      else if (Array.isArray(data[key])) {
        forArray(data[key])
      }
      else if (typeof data[key] == "object") {
        forObject(data[key])
      }
    }
  }

}
function checkForRed(data) {
  if (typeof data == "object") {
    let keys = Object.keys(data);
    for (let key of keys) {
      if (data[key] == "red") {
        return true
      }
    }
    return false
  }
}
solve(data)
console.log(count)
