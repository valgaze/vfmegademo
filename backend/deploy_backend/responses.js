const responses = [
    {  "queryText": "Welcome",  "webhookPayload": {   "google": {    "expectUserResponse": true,    "richResponse": {     "items": [{      "simpleResponse": {       "displayText": "Hi, I'm an agent greeting you on 1st launch"      }     }]    },    "isSsml": false,    "systemIntent": {     "intent": "actions.intent.OPTION",     "data": {      "listSelect": {       "items": [{        "image": {         "url": "ribbon"        },        "title": "Option1"       }, {        "image": {         "url": "ribbon"        },        "title": "Option 2"       }, {        "image": {         "url": "tree"        },        "title": "Option 3"       }, {        "image": {         "url": "wrench"        },        "title": "Option 4"       }, {        "image": {         "url": "gear"        },        "title": "Option 5"       }, {        "image": {         "url": "question"        },        "title": "Option 6"       }],       "title": "This text appears right above the list"      },      "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec"     }    }   }  },  "languageCode": "en" },
    {  "queryText": "Licensing",  "webhookPayload": {   "google": {    "expectUserResponse": true,    "richResponse": {     "items": [{      "simpleResponse": {       "displayText": "Is this the device you need assistance with?"      }     },                 {                     "basicCard": {                         "buttons": [{                             "openUrlAction": {                                 "url": "https://www.cisco.com"                             },                             "title": "Read More"                         }],                         "formattedText": "Some brief text",                         "subtitle": "Nice subtitle here",                         "title": "Good headline title here"                     }                 }],     "suggestions": [{      "title": "Yes"     }, {      "title": "No"     }]    },    "isSsml": false,    "systemIntent": {     "intent": "actions.intent.TEXT",     "data": {}    }   }  },  "languageCode": "en" },
    { "queryText": "im done", "webhookPayload": { "google": { "expectUserResponse": true, "richResponse": { "items": [{ "simpleResponse": { "displayText": "Ok great bye!!" } }, { "ratingCard": { "message": "Please rate your experience with this agent today", "persist": false } }] }, "isSsml": false, "systemIntent": { "intent": "actions.intent.TEXT", "data": {} } } }, "languageCode": "en" }
]

module.exports.responses = responses


module.exports.fakeAPI = () => {
    const phonyResponseData = {
        deviceName: `bongo___${rando()}_${rando()}`,
        deviceId: rando(),
        deviceType: 'WFH_Collab',
    }
  
    return {
        ...phonyResponseData
    }
  }
  