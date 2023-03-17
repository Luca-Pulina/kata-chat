const splitChatKata = (dirtyLines) => {
    const cleanLines = dirtyLines.replaceAll(/(\d{2}:\d{2}:\d{2}) [a-zA-Z ]+:\s/g, '\n$& ').split("\n").splice(1);

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
        const currentCustomerIdentifier = lineToArr.slice(1, indexMentionDelimiter + 1).join(" ")

        if (isFirstLine) customerIdentifier = currentCustomerIdentifier

        isFirstLine = false

        lineToObj.date = lineToArr[0]
        lineToObj.mention = `${lineToArr.slice(0, indexMentionDelimiter + 1).join(" ")} `
        lineToObj.sentence = lineToArr.slice(indexMentionDelimiter + 1).join(" ").trim()
        lineToObj.type = currentCustomerIdentifier === customerIdentifier ? 'customer' : 'agent'

        noEmptyField(lineToObj) && result.push(lineToObj)
    })

    return result
}

// soft validation
const noEmptyField = (lineToObj) => {
    return !!lineToObj.date && !!lineToObj.mention && !!lineToObj.sentence && !!lineToObj.type
}

module.exports = splitChatKata
