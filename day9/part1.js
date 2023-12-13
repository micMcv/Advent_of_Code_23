const fs = require('fs').promises

function reduceNumbers(numbers,arr){
    arr.push(numbers)
    const everyNumberIsZero = (currentValue) => currentValue === 0;

    while (!numbers.every(everyNumberIsZero)){
        let currentArray = []
        for (let i = 0; i < numbers.length - 1; i++){
            
            currentArray.push(numbers[i +1] - numbers[i])
        }
        arr.push(currentArray)
        numbers = currentArray

    }

    for (let i = arr.length -1; i > 0 ; i--){
        arr[i-1].push(arr[i].pop() + arr[i- 1].pop() )       
    }
    return arr[0].pop()
}

fs.readFile('./inputData.txt',"utf-8" ).
then(data => {
    result = 0 
    data =  data.trim().split("\r\n").map(item => item.split(" ").map(item => parseInt(item)))

    data.forEach(numbers => {
        result += reduceNumbers(numbers, [])
    })  
    console.log(result)   
})