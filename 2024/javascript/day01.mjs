import fs from 'fs';

const data = fs.readFileSync('input.txt', 'utf-8').split('\r\n');

const leftSideArray = [];
const rightSideArray = [];
const lenght = data.length;

for(let i = 0; i < lenght; i++) {
    const splitSides = data[i].split('   ');
    leftSideArray.push(splitSides[0]);
    rightSideArray.push(splitSides[1]);
}

leftSideArray.sort((a, b) => a - b);
rightSideArray.sort((a, b) => a - b);

let sum = 0;

for(let i = 0; i < lenght; i++) {
    const diff = Math.abs(rightSideArray[i] - leftSideArray[i]);
    sum += diff;
}
console.log(sum);