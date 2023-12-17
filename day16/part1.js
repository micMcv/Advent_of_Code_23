const fs = require('fs').promises

function checkDirection(direction, y,x , data) {

    let nextX = Number(x)
    let nextY = Number(y)
    
    switch (direction) {
        case "R": {
            nextX++
            if (nextX >= data[nextY].length) {
                return []
            }
            if (data[nextY][nextX] === "|") {
                return [["U", nextY, nextX], ["D", nextY, nextX]]         
            }
            if (data[nextY][nextX] === "-" || data[nextY][nextX] === ".") {
                return [["R", nextY, nextX]]
            }
            if (data[nextY][nextX] === "/") {
                return [["U", nextY, nextX]]
            }
            if (data[nextY][nextX] === "\\") {
                return [["D", nextY, nextX]]
            }
            
        }
        case "L": {
            nextX--
            if (nextX < 0) {
                return []
            }
            if (data[nextY][nextX] === "|") {
                return [["U", nextY, nextX], ["D", nextY, nextX]]         
            }
            if (data[nextY][nextX] === "-" || data[nextY][nextX] === ".") {
                return [["L", nextY, nextX]]
            }
            if (data[nextY][nextX] === "/") {
                return [["D", nextY, nextX]]
            }
            if (data[nextY][nextX] === "\\") {
                return [["U", nextY, nextX]]
            }
        }

        case "U": {
            nextY--
            if (nextY < 0) {
                return []
            }
            if (data[nextY][nextX] === "-") {
                return [["L", nextY, nextX], ["R", nextY, nextX]]         
            }
            if (data[nextY][nextX] === "|" || data[nextY][nextX] === ".") {
                return [["U", nextY, nextX]]
            }
            if (data[nextY][nextX] === "/") {
                return [["R", nextY, nextX]]
            }
            if (data[nextY][nextX] === "\\") {
                return [["L", nextY, nextX]]
            }
        }

        case "D": {
            nextY++
            if (nextY >= data.length) {
                return []
            }
            if (data[nextY][nextX] === "-") {
                return [["L", nextY, nextX], ["R", nextY, nextX]]         
            }
            if (data[nextY][nextX] === "|" || data[nextY][nextX] === ".") {
                return [["D", nextY, nextX]]
            }
            if (data[nextY][nextX] === "/") {
                return [["L", nextY, nextX]]
            }
            if (data[nextY][nextX] === "\\") {
                return [["R", nextY, nextX]]
            }
        }
            
    }
}

fs.readFile('./inputData.txt', "utf-8").
    then(data => {
        let startingPoints = ["D 0 0"]
        let seen = new Set()
        data = data.trim().split("\r\n")
        let dataCopy = [...data].map(row => row.split(""))

        while (startingPoints.length > 0) {

            currentPoint = startingPoints.shift().split(" ")
            const [direction, y , x] = [...currentPoint]
            const nextPoints = checkDirection(direction, y, x , data)
            
            for (let point of nextPoints) {
                point = point.join(" ")
                if (seen.has(point)) {
                    continue
                }
                startingPoints.push(point)
          }         
            seen.add(currentPoint.join(" "))
            dataCopy[y][x] = "#"

        }
        let result = 0
        dataCopy.forEach(row => {
            row.forEach(char => {
                if (char === "#") {
                    result++
                }
            })
        })
        console.log(result)
    })