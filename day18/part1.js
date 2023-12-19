const { start } = require('repl')

const fs = require('fs').promises

function calculateTheSize(data){
    let currentX = 0
    let currentY = 0    
    let maxY = 0
    let minY = 0
    let maxX = 0
    let minX = 0

    let coordinates  = [[0, 0]]
    let currentPoint = [0, 0]
    data = data.trim("").split("\r\n")
    data.forEach(dig => {
        let [direction, distance, color] = dig.split(" ")
        distance = parseInt(distance)
        let [y , x] = [...currentPoint]
        if (direction == "R"){
            for (let i = 1; i <= distance ; i++){
                currentPoint = [y, x + i]
                coordinates.push(currentPoint)
            }       
            currentX += distance
            maxX = currentX > maxX ? currentX : maxX                      
        }
        else if (direction == "L"){

            for (let i = 1; i <= distance ; i++){
                currentPoint = [y, x - i]
                coordinates.push(currentPoint)
            }
            currentX -= distance 
            minX = currentX < minX ? currentX : minX                     
        }
        else if (direction == "U"){

            for (let i = 1; i <= distance ; i++){
                currentPoint = [y - i, x]
                coordinates.push(currentPoint)
            }

            currentY -= distance
            minY = currentY < minY ? currentY : minY                      
        }
        else {

            for (let i = 1; i <= distance ; i++){
                currentPoint = [y + i, x]
                coordinates.push(currentPoint)
            }

            currentY += distance
            maxY = currentY > maxY ? currentY : maxY                     
        }
        
        
})
coordinates = coordinates.map(c => [c[0] + Math.abs(minY), c[1] + Math.abs( minX)])
coordinates.forEach(c => console.log(c))
console.log([minX, maxX, minY, maxY])
    return [[minX, maxX, minY, maxY] ,coordinates]
}

function correctDimensionedArray(array){
    const [minX, maxX, minY, maxY] = array
    const width = maxX - minX + 1
    const height = maxY - minY + 1
    let diggingArray = []
    for (let i = 0; i < height; i++){
        diggingArray.push(new Array(width).fill("."))
        
    }
    return diggingArray
}

function findStartingPoint(array){
    let startingPoint = [0,0]
    for ( let line of array){
        console.log(line)
        if(line[0] == "X" && line[1] == "."){
            startingPoint = [array.indexOf(line), 2]
            break
        }
    }
    return startingPoint

}

function diggingDepth (array, startingPoint){
    let seen = new Set()
    let Q = [[startingPoint[0], startingPoint[1]]]
    
    while (Q.length > 0){
        let [y, x] = Q.shift()
        if (array[y][x] == "X"){
            seen.add(`${y} ${x}`)
            continue
        }
        if (array[y][x] == "." && !seen.has(`${y} ${x}`)){
            seen.add(`${y} ${x}`)
            Q.push([y + 1, x])
            Q.push([y - 1, x - 1])
            Q.push([y - 1, x + 1])
            Q.push([y + 1, x + 1])
            Q.push([y + 1, x - 1])
            Q.push([y - 1, x])
            Q.push([y, x + 1])
            Q.push([y, x - 1])
        }
    }
    return seen.size
}

fs.readFile('./inputData.txt', "utf-8").
    then(data => {

       let [sizes, coordinates] = calculateTheSize(data)
       let diggingArray = correctDimensionedArray(sizes)
       let startingPoint
         coordinates.forEach(c => {
              diggingArray[c[0]][c[1]] = "X"
         })
        startingPoint = findStartingPoint(diggingArray)
       diggingArray.forEach(d => console.log(d.join("")))
       let result = diggingDepth(diggingArray, startingPoint)
       console.log(result)
        
    })