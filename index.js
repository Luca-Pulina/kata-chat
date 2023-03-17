
const fs = require('fs')
const inputFile = 'inputFile.txt'


const dirtyLines = fs.readFileSync(inputFile, 'utf-8');
const cleanLines = dirtyLines.replaceAll(/(\d{2}:\d{2}:\d{2})\s(Customer|Agent)/g, '\n$1 $2').split("\n").splice(1);


const result = []
let customerIdentifier = ""
let isFirstLine = true

cleanLines.forEach(line => {
    let lineToObj = {
        date: "",
        mention: "",
        sentence: "",
        type: ""
    }
    const lineToArr = line.split(" ")
    const indexMentionDelimiter = lineToArr.findIndex(element => element === ":")

    //isFirstLine ? customerIdentifier = lineToArr.slice(1, indexMentionDelimiter+1).join(" ") : isFirstLine = false
    if (isFirstLine) customerIdentifier = lineToArr[1]

    isFirstLine = false

    lineToObj.date = lineToArr[0]
    lineToObj.mention = `${lineToArr.slice(0, indexMentionDelimiter + 1).join(" ")} `
    lineToObj.sentence = lineToArr.slice(indexMentionDelimiter + 1).join(" ")
    lineToObj.type = lineToArr[indexMentionDelimiter - 1] === customerIdentifier ? 'customer' : 'agent'

    lineToObj.date && result.push(lineToObj)
})

console.log(result)



