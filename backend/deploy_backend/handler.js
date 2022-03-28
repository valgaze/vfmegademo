"use strict";

const {
  responses
} = require("./responses");

const rando = () => Math.random().toString(32).slice(2)
const fakeAPI = () => {
  const phonyResponseData = {
      deviceName: `bongo___${rando()}_${rando()}`,
      deviceId: rando(),
      deviceType: 'WFH_Collab',
  }

  return {
      ...phonyResponseData
  }
}


let counter = 0 // less dopey to handle this
module.exports.speedybot_serverless = async (event) => {

    try {
        const {
            step
        } = event.queryStringParameters ? event.queryStringParameters : {}
        if (step || step === 0 || step === "0") {
            //  console.log(`step: ${step}`)
            counter = parseInt(step)
            if (responses[counter]) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        step,
                        ...responses[counter]
                    })
                };
            } else {
                return {
                    statusCode: 200,
                    body: JSON.stringify(...counter, responses[0])
                };
            }

        } else {
            let res = {}

            if (counter == responses.length - 1) {
                res = responses[counter]
                counter = 0
            } else {
                res = responses[counter]
                console.log("WHY WUNT U INCREMENT :(", counter)
                counter = counter+1
                console.log("post", counter)

            }

            return {
              statusCode: 200,
              body: JSON.stringify({counter, ...res})
            }
        }
    } catch (e) {
        return {
            statusCode: 409,
            body: JSON.stringify({
                message: "There was some type of catastrophic error",
                error: e,
            }),
        };
    }
};


module.exports.image_recognition = async (event) => {
  const data = fakeAPI()
  return { ...data }
}