let file = require('fs').readFileSync('puzzle.txt', 'utf8').split('\n');
file.pop();
const allDistance = [];
for (let i of file) {
  let data = i.split(' ');
  let speed = Number(data[3]);
  let stamina = Number(data[6]);
  let rest = Number(data[13]);
  // console.log(speed, stamina, rest)
  const temp = [speed, stamina, rest];
  allDistance.push(temp);
}
function doIt(array) {
  let some = distanceTravelled(array[0], array[1], array[2], 2503);
  return some
}

function distanceTravelled(speed, stamina, rest, time) {
  let count = Math.floor(time / (stamina + rest));
  let rem = time % (stamina + rest);
  let temp = count * (stamina * speed);
  if (rem < stamina) {
    temp += rem * speed
  }
  else {
    temp += stamina * speed
  }
  return temp
}
for (let i = 0; i < allDistance.length; i++) {
  console.log(doIt(allDistance[i]))
}


function partTwo(array) {
  const points = new Array(array.length).fill(0);
  for (let i = 1; i <= 2503; i++) {
    const holder = [];
    for (let j = 0; j < array.length; j++) {
      let temp = distanceTravelled(array[j][0], array[j][1], array[j][2], i);
      holder.push(temp);
    }
    let max = Math.max(...holder);
    holder.forEach((element, index) => {
      if (element === max) {
        points[index]++;
      }
    })
  }
  console.log(Math.max(...points))
}
partTwo(allDistance);
