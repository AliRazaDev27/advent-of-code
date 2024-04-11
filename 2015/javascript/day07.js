var file = require('fs').readFileSync('puzzle.txt', 'utf8');
const data = file.split('\n');
const map = new Map();

for (let i = 0; i < data.length - 1; i++) {
  let line = data[i].split(' ');
  map.set(line[line.length - 1], line.slice(0, line.length - 2));
}
map.set('b', [956]);

function applyNot(number) {
  let stringForm = number.toString(2).padStart(16, '0');
  let not = '';
  for (let i = 0; i < stringForm.length; i++) {
    not += stringForm[i] == '1' ? '0' : '1';
  }
  return parseInt(not, 2);
}

function generate(key) {
  if (map.has(key)) {
    let command = map.get(key);
    if (command.length == 1) {
      let value = Number(command[0])
      if (isNaN(value)) {
        let res = generate(command[0]);
        map.set(key, [res])
        return res;
      }
      else {
        return value
      }
    }
    if (command.length == 2) {
      if (isNaN(command[1])) {
        let temp = generate(command[1])
        let res = applyNot(temp);
        map.set(key, [res])
        return res;
      }
      return applyNot(Number(command[1]));
    }
    if (command.length == 3) {
      let op1, op2;
      if (isNaN(command[0])) {
        op1 = generate(command[0]);
      }
      else {
        op1 = Number(command[0]);
      }
      if (isNaN(command[2])) {
        op2 = generate(command[2]);
      }
      else {
        op2 = Number(command[2]);
      }
      switch (command[1]) {
        case 'AND':
          map.set(key, [op1 & op2])
          return op1 & op2;
        case 'OR':
          map.set(key, [op1 | op2])
          return op1 | op2;
        case 'LSHIFT':
          map.set(key, [op1 << op2])
          return op1 << op2;
        case 'RSHIFT':
          map.set(key, [op1 >> op2])
          return op1 >> op2;
        default:
          console.log(`default: ${command[1]}`)
          break;
      }
    }
  }
}
let val = generate('a');
console.log(val);
