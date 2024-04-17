const file = require('fs').readFileSync('puzzle.txt', 'utf8').split('\n');
file.pop();
const capacity = []
const durability = []
const flavor = []
const texture = []
for (let i of file) {
  let data = i.split(' ');
  capacity.push(Number(data[2].slice(0, -1)));
  durability.push(Number(data[4].slice(0, -1)));
  flavor.push(Number(data[6].slice(0, -1)));
  texture.push(Number(data[8].slice(0, -1)));
}

let max = 0;
for (let i = 1; i < 100; i++) {
  for (let j = 100 - i - 1; j > 0; j--) {
    for (let k = 100 - i - j - 1; k > 0; k--) {
      if ((i + j + k + 100 - i - j - k) === 100) {
        let l = 100 - i - j - k;
        let capacitySum = i * capacity[0] + j * capacity[1] + k * capacity[2] + l * capacity[3];
        if (capacitySum < 0) {
          capacitySum = 0
        }
        let durabilitySum = i * durability[0] + j * durability[1] + k * durability[2] + l * durability[3];
        if (durabilitySum < 0) {
          durabilitySum = 0
        }
        let flavorSum = i * flavor[0] + j * flavor[1] + k * flavor[2] + l * flavor[3];
        if (flavorSum < 0) {
          flavorSum = 0
        }
        let textureSum = i * texture[0] + j * texture[1] + k * texture[2] + l * texture[3];
        if (textureSum < 0) {
          textureSum = 0
        }
        let total = capacitySum * durabilitySum * flavorSum * textureSum;
        if (max < total) {
          max = total
        }
      }
    }
  }
}
console.log(max)

