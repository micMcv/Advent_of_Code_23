const fs = require('fs').promises

function iqTest(numbers){
    let arr = []
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
        arr[i-1].unshift( arr[i- 1][0] - arr[i][0])      
    }
    return arr[0][0]

}

fs.readFile('./inputData.txt',"utf-8" ).
then(data => {
    result = 0 
    data =  data.trim().split("\r\n").map(item => item.split(" ").map(item => parseInt(item)))

    data.forEach(numbers => {
        result += iqTest(numbers)
    })  
    console.log(result)   
})