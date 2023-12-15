const fs = require('fs').promises

let boxes = {}

for (let i = 0; i < 256; i++) {
    boxes[i] = []
}

function hashConverter(string, currentValue) {

    const [label, number] = string.includes("=") ? string.split("=") : [string.replace("-", ""), 0]

    for (const char of label) {
        currentValue = ((currentValue + char.charCodeAt(0)) * 17) % 256
    }

    return [currentValue, label, Number(number)]

}

function operationMinus(hash, label) {

    boxes[hash] = boxes[hash].filter(item => !item.includes(label))

}

function operationEquals(hash, label, number) {

    let entryFound = false

    boxes[hash] = boxes[hash].map(item => {


        if (item.includes(label)) {

            entryFound = true
            return `${label} ${number}`

        }

        return item

    })

    if (!entryFound) {

        boxes[hash].push(`${label} ${number}`)

    }
}

function calculateLensPower(boxes) {

    let result = 0

    for (let n = 0; n < 256; n++) {

        const multiplier = n + 1

        boxes[n].forEach((item, index) => {

            const number = item.split(" ")[1]
            result += multiplier * (index + 1) * Number(number)

        })

    }

    return result

}

fs.readFile('./inputData.txt', "utf-8").
    then(data => {
        let result = 0
        data = data.trim().split(",")

        data.forEach(string => {
            const [hash, label, number] = hashConverter(string, 0)

                if (number == 0) {

                    operationMinus(hash, label)

                }

                else {

                    operationEquals(hash, label, number)

                }

            }
        )
        console.log(calculateLensPower(boxes))
    })