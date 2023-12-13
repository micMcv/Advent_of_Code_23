const fs = require('fs').promises

const amountOfJokers = (hand) => {
    const result = hand.match(/[J]/gi)
    if (result === null) return 0
    return result.length
}

const fiveOfAKind = (hand) => hand.every( (value) => value === hand[0])

const fourOfaKind = (hand) => {
    hand = hand.join("")
    firstCard = hand[0]
    secondCard = hand[1]
    const regexA = new RegExp(`[${firstCard}]`, "g")
    const regexB = new RegExp(`[${secondCard}]`, "g")
    return (hand.match(regexA).length === 4 || hand.match(regexB).length === 4)
}

const fullHouse = (hand) => {
    const setOfCards = new Set(hand)
    return setOfCards.size === 2}

const threeOfaKind = (hand) => {

    hand = hand.join("")
    firstCard = hand[0]
    secondCard = hand[1]
    thirdCard = hand[2]
    const regexA = new RegExp(`[${firstCard}]`, "g")
    const regexB = new RegExp(`[${secondCard}]`, "g")
    const regexC = new RegExp(`[${thirdCard}]`, "g")
    return (hand.match(regexA).length === 3 || hand.match(regexB).length === 3 || hand.match(regexC).length === 3)

}

const twoPair = (hand) => {
    const setOfCards = new Set(hand)
    return setOfCards.size === 3
    
}
const onePair = (hand) => {
    const setOfCards = new Set(hand)
    return setOfCards.size === 4
    
}

const cardPowers = {
    "FiveOfAKind": 200,
    "FourOfAKind": 160,
    "FullHouse": 120,
    "ThreeOfAKind": 80,
    "TwoPair": 40,
    "OnePair": 20,
    "A": 14,
    "K": 13,
    "Q": 12,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    "J": 1
}

function checkForStregnth(entry){
    
    let [hand, bid] = entry.split(" ")
    originalOrder = hand
    hand = hand.split("").sort((a,b) => a.charCodeAt(0) - b.charCodeAt(0))

    if (fiveOfAKind(hand)){
        return [hand, cardPowers["FiveOfAKind"] ,bid,originalOrder]     
    }

    
    if (fourOfaKind(hand)){
        if (amountOfJokers(originalOrder)){
            return [hand, cardPowers["FiveOfAKind"],bid, originalOrder]
        }
        return [hand, cardPowers["FourOfAKind"] ,bid, originalOrder]     
    }


    if (fullHouse(hand)){
        if (amountOfJokers(originalOrder)){
            return [hand, cardPowers["FiveOfAKind"],bid, originalOrder]
        }
        return [hand, cardPowers["FullHouse"] ,bid, originalOrder]     
}


    if (threeOfaKind(hand)){

        if (amountOfJokers(originalOrder)){ 
            return [hand, cardPowers["FourOfAKind"],bid, originalOrder]
        }




        return [hand, cardPowers["ThreeOfAKind"] ,bid, originalOrder]     
    }

    if (twoPair(hand)){
        return [hand, cardPowers["TwoPair"] ,bid, originalOrder]     
    }
    if (onePair(hand)){
        return [hand, cardPowers["OnePair"] ,bid, originalOrder]     
    }

    return [hand, 0 ,bid, originalOrder]
}

fs.readFile('./inputData.txt',"utf-8" ).
then(data => {
    result = 0 
    data =  data.trim().split("\r\n").map(item => checkForStregnth(item)).sort((a,b) => {
        
        if ( a[1] == b[1]){
            for (let i = 0; i < a[3].length; i++) {
                if (a[3][i] !== b[3][i]){

                    return cardPowers[a[3][i]] - cardPowers[b[3][i]]
                }               
            }
        }
       return a[1] - b[1]   
    })

    data.forEach((item , index)=> {

        result += Number(item[2]) * (index + 1)
    })
    
    data.forEach(item => {
        console.log(item)
    })
    
    console.log(result)   
})