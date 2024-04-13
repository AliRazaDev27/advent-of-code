let puzzle_input = "1113222113";
let updated_input = puzzle_input;
for (let x = 1; x <= 50; x++) {
  let temp = "";
  for (let i = 0; i < updated_input.length; i++) {
    let char = updated_input[i];
    let count = 1;
    for (let j = i + 1; j < updated_input.length; j++) {
      if (updated_input[j] === char) {
        count++;
      }
      else {
        i = j - 1;
        break;
      }
    }
    temp += count.toString() + char;
  }
  updated_input = temp
}
console.log(`length: ${updated_input.length}`)
