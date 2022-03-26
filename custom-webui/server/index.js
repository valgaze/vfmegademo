/**
 * Goal: very forgiving backend, return conversation "steps"
 * 
 * Returns conversation "steps"
 * - Hit from api block
 * - Has rich components & other formatting
 * 
 * Returns image recognition from photo camera
 *  - Phone takes a photo and uploads to bot
 *  - Bot runs image recognition api against bytes
 *  - Response will be device info, or could influence support chat
 * 
 * Takeaway
 * - Fuse/blend together lots of different systems
 */

const express = require('express')
const bodyParser = require('body-parser')
const { join } = require('path')
const app = express()


const { port = process.env.PORT} = require('./../settings/config.json')

const {computerVisionService } = require('./util')

app.use(express.static(join(__dirname, 'ui')));
app.use(bodyParser.json());
app.post('/ping', (req, res) => res.send('pong!'))

//
// image recognition for file upload
app.post('/image_recognition', async (req, res) => {
    const { bytes, config={} } = req.body
    const result = await computerVisionService(bytes, config).catch(e => {
        res.status(500).send(e)
        console.log(e)  
    })

    res.status(200).send(result)
})

// Canned version
const responses = [
    {  "queryText": "Welcome",  "webhookPayload": {   "google": {    "expectUserResponse": true,    "richResponse": {     "items": [{      "simpleResponse": {       "displayText": "Hi, I'm an agent greeting you on 1st launch"      }     }]    },    "isSsml": false,    "systemIntent": {     "intent": "actions.intent.OPTION",     "data": {      "listSelect": {       "items": [{        "image": {         "url": "lock"        },        "title": "Option 1"       }, {        "image": {         "url": "ribbon"        },        "title": "Option 2"       }, {        "image": {         "url": "tree"        },        "title": "Option 3"       }, {        "image": {         "url": "wrench"        },        "title": "Option 4"       }, {        "image": {         "url": "gear"        },        "title": "Option 5"       }, {        "image": {         "url": "question"        },        "title": "Option 6"       }],       "title": "This text appears right above the list"      },      "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec"     }    }   }  },  "languageCode": "en" },
    {  "queryText": "Licensing",  "webhookPayload": {   "google": {    "expectUserResponse": true,    "richResponse": {     "items": [{      "simpleResponse": {       "displayText": "Is this the device you need assistance with?"      }     },                 {                     "basicCard": {                         "buttons": [{                             "openUrlAction": {                                 "url": "https://www.cisco.com"                             },                             "title": "Read More"                         }],                         "formattedText": "Some brief text",                         "subtitle": "Nice subtitle here",                         "title": "Good headline title here"                     }                 }],     "suggestions": [{      "title": "Yes"     }, {      "title": "No"     }]    },    "isSsml": false,    "systemIntent": {     "intent": "actions.intent.TEXT",     "data": {}    }   }  },  "languageCode": "en" },
    { "queryText": "im done", "webhookPayload": { "google": { "expectUserResponse": true, "richResponse": { "items": [{ "simpleResponse": { "displayText": "Ok great bye!!" } }, { "ratingCard": { "message": "Please rate your experience with this agent today", "persist": false } }] }, "isSsml": false, "systemIntent": { "intent": "actions.intent.TEXT", "data": {} } } }, "languageCode": "en" }
]

let counter = 0 // "state"
app.post('/api_block', (req, res) => {
    const { setCounter } = req.query
    if (setCounter) {
        counter = parseInt(setCounter)
    } else {
        if (counter == responses.length - 1) {
            res.send(responses[counter])
            counter = 0
        } else {
            res.send(responses[counter])
            counter++
        }
    }
})

app.listen(port, () => {
    console.log(`Listening + tunneled on port ${port}`)
})