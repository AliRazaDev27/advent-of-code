let puzzle_input = "hxbxxyzz"
function genNextString(string) {
  let len = string.length - 1;
  let x;
  let j;
  for (let i = len; i >= 0; i--) {
    if (string.charCodeAt(i) !== 122) {
      x = string.charCodeAt(i);
      j = i;
      break
    }
  }
  const temp = string.slice(0, j) + String.fromCharCode(x + 1);
  const next = temp.padEnd(8, 'a');
  return next;
}
function threeCharsInARow(string) {
  let len = string.length;
  for (let i = 0; i < len - 2; i++) {
    if (string.charCodeAt(i) === (string.charCodeAt(i + 1) - 1) && string.charCodeAt(i + 1) === (string.charCodeAt(i + 2) - 1)) {
      return true;
    }
  }
  return false;
}
function findPairs(string) {
  let len = string.length;
  let char = 123;
  let count = 0;
  for (let i = 0; i < len; i++) {
    if (string.charAt(i) === string.charAt(i + 1) && string.charCodeAt(i) !== char) {
      char = string.charAt(i);
      i = i + 1;
      count++;
    }
    if (count === 2) {
      return true
    }
  }
  return false
}
function solve(string) {
  let solved = false;
  let store = string
  while (!solved) {
    const next = genNextString(store);
    if (!(/[iol]/g).test(string)) {
      if (findPairs(next) && threeCharsInARow(next)) {
        return next;
      }
    }
    store = next;
  }
}
console.log(solve(puzzle_input))
