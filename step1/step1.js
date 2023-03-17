/*SKAFFOLD - Start*/
const fs = require('fs')
const readline = require('readline')

const fileName = 'step1.txt'

const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    crlfDelay: Infinity
}
)

/*SKAFFOLD - End*/

let result = []

rl.on('line', (line) => {
    let lineToObj = {
        date: "",
        mention: "",
        sentence: "",
        type: ""
    }

    const lineToArr = line.split(" ")
    const indexMentionDelimiter = lineToArr.findIndex(element => element === ":")
    lineToObj.date = lineToArr[0]
    lineToObj.mention = `${lineToArr.slice(0,indexMentionDelimiter+1).join(" ")} `
    lineToObj.sentence = lineToArr.slice(indexMentionDelimiter+1).join(" ")
    lineToObj.type = lineToArr[indexMentionDelimiter - 1].toLowerCase()
    result.push(lineToObj)
})

rl.on('close', () => {
    console.log(result)
  });

