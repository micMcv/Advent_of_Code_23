const { dir } = require('console')

const fs = require('fs').promises

function checkDirection(direction, y, x, data, firstIteration) {

    let nextX = Number(x)
    let nextY = Number(y)

    switch (direction) {
        case "R": {
            nextX = firstIteration ? nextX : nextX + 1
            if (nextX >= data[nextY].length) {
                return []
            }
            if (data[nextY][nextX] === "|") {
                return [`U ${nextY} ${nextX}`, `D ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "-" || data[nextY][nextX] === ".") {
                return [`R ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "/") {
                return [`U ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "\\") {
                return [`D ${nextY} ${nextX}`]
            }

        }
        case "L": {
            nextX = firstIteration ? nextX : nextX - 1
            if (nextX < 0) {
                return []
            }
            if (data[nextY][nextX] === "|") {
                return [`U ${nextY} ${nextX}`, `D ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "-" || data[nextY][nextX] === ".") {
                return [`L ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "/") {
                return [`D ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "\\") {
                return [`U ${nextY} ${nextX}`]
            }
        }

        case "U": {
            nextY = firstIteration ? nextY : nextY - 1
            if (nextY < 0) {
                return []
            }
            if (data[nextY][nextX] === "-") {
                return [`L ${nextY} ${nextX}`, `R ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "|" || data[nextY][nextX] === ".") {
                return [`U ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "/") {
                return [`R ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "\\") {
                return [`L ${nextY} ${nextX}`]
            }
        }

        case "D": {
            nextY = firstIteration ? nextY : nextY + 1
            if (nextY >= data.length) {
                return []
            }
            if (data[nextY][nextX] === "-") {
                return [`L ${nextY} ${nextX}`, `R ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "|" || data[nextY][nextX] === ".") {
                return [`D ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "/") {
                return [`L ${nextY} ${nextX}`]
            }
            if (data[nextY][nextX] === "\\") {
                return [`R ${nextY} ${nextX}`]
            }
        }

    }
}

function checkNextPoint(startingPoint, data) {
    let firstIteration = true
    let seen = new Set()
    let result = new Set()

    while (startingPoint.length > 0) {

        currentPoint = startingPoint.shift().split(" ")
        const [direction, y, x] = [...currentPoint]
        const nextPoints = firstIteration ? checkDirection(direction, y, x, data, true) : checkDirection(direction, y, x, data)
        firstIteration = false

        for (let point of nextPoints) {
            if (!seen.has(point)) {           
                startingPoint.push(point)
            }
        }
        seen.add(currentPoint.join(" "))
        result.add(`${y} ${x}`)
    }
    return result.size
}

fs.readFile('./inputData.txt', "utf-8").
    then(data => {
        data = data.trim().split("\r\n")
        let res = 0
        for (let y = 0; y < data.length; y++) {

            if (y == 0 || y == data.length - 1) {

                for (let x = 0; x < data[y].length; x++) {
                    for (direction of ["U", "D"]) {
                        const result = checkNextPoint([`${direction} ${y} ${x}`], data)
                        res = result > res ? result : res

                    }
                }
            }
            else {
                for (let x of [0, data[y].length - 1]) {
                    for (direction of ["R", "L"]) {
                        const result = checkNextPoint([`${direction} ${y} ${x}`], data)
                        res = result > res ? result : res
                    }
                }
            }
        }
        console.log(res)
    })