import { Launch, bad } from 'speedybot'
import handlers from './../settings/handlers'
import { token } from './../../settings/config.json'
// helper types
import { BotHandler, SpeedybotConfig } from 'speedybot'

async function boot(config: SpeedybotConfig, handlers: BotHandler[]) {
    try {
        const speedybotInst = await Launch(config, handlers)
        const phrase = config.webhookUrl ? `Webhook available here: ${config.webhookUrl}` : 'Connected using websockets'
        console.log(`Success! ${phrase}`)
        return speedybotInst
    } catch (e) {
        bad(e)
    }    
}

boot({token}, handlers)
