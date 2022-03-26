import {WebhookHandler} from 'speedybot'
const handler: WebhookHandler = {
    keyword: '<@webhook>',
    route: '/my_test_webhook',
    handler(req, res) {
        // Note this is a special handler unlike all the others
        // If your bot is NOT deployed (ie 'webhookUrl' in settings/config.json is blank)
        // any <@webhook> handlers are discarded
        const { body } = req
        const msg = `Webhook alert for /my_test_route, data received: ${JSON.stringify(body)}`
        
        const cardJson = {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
                {
                    "type": "TextBlock",
                    "size": "Medium",
                    "weight": "Bolder",
                    "text": "Data"
                },
                {
                    "type": "RichTextBlock",
                    "inlines": [
                        {
                            "type": "TextRun",
                            "text": JSON.stringify(body, null, 2)
                        }
                    ]
                }
            ],
        }

        const targetEmail = 'joe@joe.com'
        this.send({toPersonEmail: targetEmail, text: msg})
        this.sendCardToPerson(targetEmail, cardJson)

        res.status(200).send('Thanks') // optional, in case server needs acknowledgement
    }
}
export default handler