let file = require('fs');
const input = file.readFileSync('puzzle.txt', 'utf8').split('\n');
input.pop();

function charInMemory(string) {
  let length = string.length
  let chars = 0;
  if (length < 3) {
    return 0;
  }

  for (let i = 1; i < length - 1; i++) {
    if (string[i] === '\\' && string[i + 1] === 'x') {
      chars++;
      i += 3;
    }
    else if (string[i] === '\\') {
      chars++;
      i += 1;
    }
    else {
      chars++;
    }
  }
  return chars;
}
function charInModifiedString(string) {
  let length = string.length
  let newString = '';
  for (let i = 0; i < length; i++) {
    if (string[i] === '\\') {
      newString += '\\' + '\\';
    }
    else if (string[i] === '"') {
      newString += '\\' + '"';
    }
    else {
      newString += string[i];
    }
  }
  return newString.length + 2;
}

function matchsticks(input) {
  let inputLength = input.length;
  let totalCharsInStringLiteral = 0;
  let totalCharsInMemory = 0;
  for (let i = 5; i < inputLength; i++) {
    totalCharsInStringLiteral += input[i].length;
    totalCharsInMemory += charInMemory(input[i]);
  }
  console.log(`difference: ${totalCharsInStringLiteral - totalCharsInMemory}`)
}
function matchsticks2(input) {
  let inputLength = input.length;
  let totalCharsInStringLiteral = 0;
  let totalCharsInModifiedString = 0;
  for (let i = 0; i < inputLength; i++) {
    totalCharsInStringLiteral += input[i].length;
    totalCharsInModifiedString += charInModifiedString(input[i]);
  }
  console.log(`difference: ${totalCharsInModifiedString - totalCharsInStringLiteral}`)
}

matchsticks2(input);
