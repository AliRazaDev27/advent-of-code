const file = require('fs').readFileSync('puzzle.txt','utf-8').split('\n')
const data = []
for(let i=0; i<file.length;i++){
    data[i] = file[i].split("")
}
function doIt(array){
    const temp = new Array(100).fill(".");
    for(let x = 0 ; x<temp.length;x++){
        temp[x] = new Array(100).fill(".");
    }
    temp[0][0] = "#"
    temp[0][99] = "#"
    temp[99][0] = "#"
    temp[99][99] = "#"
    for(let i = 0;i<100;i++){
        for(let j = 0;j<100;j++){
            if(i === 0 && j === 0){
                continue
            }
            if(i === 0 && j === 99){
                continue
            }
            if(i === 99 && j === 0){
                continue
            }
            if(i === 99 && j === 99){
                continue
            }
            let neightbourCount = findNeighboursOn(i,j,array)
            if(array[i][j] === "#"){
                if(neightbourCount === 2 || neightbourCount === 3){
                    temp[i][j] = "#"
                }
            }
            else if(array[i][j] === "."){
                if(neightbourCount == 3){
                    temp[i][j] = "#"
                }
            }
            else{
                console.log("error")
            } 
        }
    }
    return temp
}
let sample = [];
sample = data;

for(let iter = 1;iter<=100;iter++){
    sample = doIt(sample)
}
let valueCount = 0;
for(let i = 0;i<100;i++){
    for(let j = 0;j<100;j++){
        if(sample[i][j] === "#"){
            valueCount++
        }
    }
}
console.log("ValueCount:",valueCount)




function findNeighboursOn(i,j,array){
    let count = 0;
    if(array[i-1] !== undefined){
        if(array[i-1][j-1] == "#"){
            count++;
        }
        if(array[i-1][j] == "#"){
            count++;
        }
        if(array[i-1][j+1] == "#"){
            count++;
        }
    }
    if(array[i] !== undefined){
        if(array[i][j-1] == "#"){
            count++;
        }
        if(array[i][j+1] == "#"){
            count++;
        }
    }
    if(array[i+1] !== undefined){
        if(array[i+1][j-1] == "#"){
            count++;
        }
        if(array[i+1][j] == "#"){
            count++;
        }
        if(array[i+1][j+1] == "#"){
            count++;
        }
    }
   return count
}