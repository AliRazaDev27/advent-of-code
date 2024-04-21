const percom = require('percom')
const data = [50,44,11,49,42,46,18,32,26,40,21,7,18,43,10,47,36,24,22,40]
data.sort((a,b)=>a-b)

let min =4
let max = 8
let count = 0;
for(let i = min; i<=max; i++){
    const gen = percom.com(data,i)
    for(let arr of gen){
        let result = isEqualTo(arr)
        if(result === true){
            count++;
        }
    }
    break;
}


console.log(count)
function isEqualTo(array){
    const result = array.reduce((total,value)=>total+value,0)
    if(Number(result === 150)){
        return true
    }
    return false
}