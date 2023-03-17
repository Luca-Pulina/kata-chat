import { it, expect } from "vitest"

import splitChatKata from "./index"

const step1 = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
const step2 = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.`
const step3 = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.
14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.
14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text.
`
const step4 = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.`
const step5 = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus.`
const step6 = `14:24:32 Luca Galasso : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Emanuele Querzola : I received the package, ut blandit lectus.`

it('should test a single sentence', () => {
    const result = splitChatKata(step1)
    expect(result).toStrictEqual(
        [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'customer'
        }]
    )
})

it('should test two sentences', () => {
    const result = splitChatKata(step2)
    expect(result).toStrictEqual(
        [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'customer'
        }, {
            date: '14:26:15',
            mention: '14:26:15 Agent : ',
            sentence: 'Aliquam non cursus erat, ut blandit lectus.',
            type: 'agent'
        }]
    )
})


it('should test two customer mentions as start', () => {
    const result = splitChatKata(step3)
    expect(result).toStrictEqual(
        [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'customer'
        }, {
            date: '14:27:00',
            mention: '14:27:00 Customer : ',
            sentence: 'Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.',
            type: 'customer'
        }, {
            date: '14:27:47',
            mention: '14:27:47 Agent : ',
            sentence: 'Vestibulum tempor diam eu leo molestie eleifend.',
            type: 'agent'
        }, {
            date: '14:28:28',
            mention: '14:28:28 Customer : ',
            sentence: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
            type: 'customer'
        }]
    )
})

it('should test date splitting', () => {
    const result = splitChatKata(step4)
    expect(result).toStrictEqual(
        [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'customer'
        }, {
            date: '14:26:15',
            mention: '14:26:15 Agent : ',
            sentence: 'Aliquam non cursus erat, ut blandit lectus.',
            type: 'agent'
        }]
    )
})

it('should ignore extra dates', () => {
    const result = splitChatKata(step5)
    expect(result).toStrictEqual(
        [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'customer'
        }, {
            date: '14:26:15',
            mention: '14:26:15 Agent : ',
            sentence: 'I received it at 12:24:48, ut blandit lectus.',
            type: 'agent'
        }]
    )
})

it('should manages full names', () => {
    const result = splitChatKata(step6)
    expect(result).toStrictEqual(
        [{
            date: '14:24:32',
            mention: '14:24:32 Luca Galasso : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'customer'
        }, {
            date: '14:26:15',
            mention: '14:26:15 Emanuele Querzola : ',
            sentence: 'I received the package, ut blandit lectus.',
            type: 'agent'
        }]
    )
})