// Root config
import { apiKey, host, port } from './../../settings/config.json'

import { BotHandler, $, SpeedyCard} from 'speedybot'
import pretty from 'pretty'
import axios from 'axios'

import Namegamehandler from './namegame'
import { Voiceflow, TransformedResponse } from './vf'
import { XlsHelper } from './xlsx'


// if we need to call backend for some reason from this agent
// image?
export const $postBackend = async (route='api_block', data={}, config={}) => {
	const tidyRoute = route.includes('/') ? route : `/${route}`
	const fullURL = `http://${host}:${port}${tidyRoute}`

	// `https://${host}:${port}/${tidyRoute}`
	return axios.post(fullURL, data, config)
}


/**
 * Add a "handler" below to control your bot's responses to a user-- just add to the list
 * 
 * At minimum a handler must have
 * A handler has 3 components:
 * - Keyword: a string, regex, or list of strings or regex's that will match against the user's input (or a **[Special Keyword](#special-keywords)**)
 *
 * - Handler: A function that takes a ```bot``` and ```trigger```
 * 
 * - helpText: A decription of what the handler does (used by the default <@help> handler to tell users what your bot can do)
 * 
 * Special keyword phrases:
 * 1) "<@submit>": will be triggered whenever the user subits data from a form
 * 2) "<@catchall>": will be triggered on every message received
 * 3) "<@help>": override the built-in help handler
 * 4) "<@fileupload>": Handle file-upload event
 * 5) "<@nomatch>": Fires when there is no matching intent
 * 6) "<@spawn>": Gets called whenever a user adds your bot to a new space-- there are some caveats, however, to its behavior, so if you think you'll need this, see here: https://github.com/valgaze/speedybot/blob/master/docs/resources.md
 * 7) "<@despawn>": Opposite of spawn, see here for details: https://github.com/WebexSamples/webex-node-bot-framework/#despawn
 */
const handlers: BotHandler[] = [
	{
		keyword: '<@catchall>',
		async handler(bot, trigger) {
			const $bot = $(bot)
			const resy = await $postBackend('image_recognition', {})
			console.log("##", resy)
			$bot.sendSnippet(resy.data, 'Beer')

			const vf = new Voiceflow(apiKey)

			let res: TransformedResponse[];
			let session = await $bot.getData('session')
			if (!session) {
				session = $bot.rando()
				await $bot.saveData('session', session)

				// "launch"  will reset the user and start from the first block
				res = await vf.launch(session)
			} else {
				res = await vf.send(session, trigger.text)
			}
		
			for (let i = 0; i < res.length; i++) {
				const item = res[i]

				const { type, value } = item
				if (type === 'text') {
					await bot.say(value)
				}

				if (type === 'choice') {
					await $bot.sendChips(value as string[])
				}

				if (type === 'visual' && value) {
					const card = new SpeedyCard()
										.setImage(value as string)

					await bot.sendCard(card.render(), value as string)
				}
			}
		},
		helpText: `A handler that greets the user`
	},
	{
		keyword: ['sendfile'],
		handler(bot, trigger) {
			const $bot = $(bot)
			// Send a publically accessible URL file
			// Supported filetypes: ['doc', 'docx' , 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'gif', 'png']
			const pdf = 'https://speedybot.valgaze.com'

			$bot.sendDataFromUrl(pdf)

		},
		helpText: `A handler that attaches a file in a direct message`
	},
	/**
	 * <@fileupload>
	 * 
	 * This will run on any file-upload
	 * 
	 * - "lite files": txt, json, csv
	 * - "heavy files": xlsx, jpeg
	 * - xlsx convert to html, show code preview, send html file back
	 * - jpeg get bytes and send to 3rd-party service
	 **/
	 {
		keyword: '<@fileupload>',
		async handler(bot, trigger) {
				const $bot = $(bot)
				// take 1st file uploaded, note this is just a URL which requires auth to retrieve
				const [file] = trigger.message.files
				// Retrieve file data, note responseType is arraybufffer
				// arraybuffer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
				const fileData = await $bot.getFile(file)
				const liteFiles = ['txt', 'json', 'csv']
				const { extension } = fileData 

				if (liteFiles.includes(extension)) {
					// lite files

					const {
						data, // bytes
						extension, // "txt"
						fileName, // "bongo.txt"
						type, // "text/plain"
					} = fileData


					bot.say(JSON.stringify({data, extension, fileName, type}, null, 2))
				} else {
					// deal with "heaver" files like xlsx, jpeg, pptx, pdf, etc
					const fileReattempt = await $bot.getFile(file, {responseType: 'arraybuffer'})
					const {
						extension, // "txt"
						fileName, // "bongo.txt"
						type, // "text/plain"
						data, // bytes (buffer)
					} = fileReattempt

					if (extension === 'xlsx') {
						console.log('\n\n---------\n\n')
						console.log(fileData.data)


						console.log('\n\n---------\n\n')

						// If it's a *.xlsx file, convert the 1st sheet to html
						const inst = new XlsHelper(fileData.data)
						const sheet = inst.getFirstSheet()
						console.log("##", inst.getJSON(sheet))
						const html = inst.getHTML(sheet)
	
						// Return copy/paste'able HTML snippet
						const prettyed = pretty(html)
						bot.say({markdown: $bot.htmlSnippet(prettyed)})
	
						// Send an actual html file to the user
						$bot.sendDataAsFile(html, '*.html')
						
					} else if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
						const payload = {
							bytes: data,
							config: {}
						}

						const res = await $postBackend('/image_recognition', payload)
						console.log('## we hit route', res.data)
						$bot.sendSnippet(res.data, 'Here is photo info')
						bot.say(`From here, we should take the result call voice or do something with it`)

					} else {
						// debug for other file types
						$bot.sendSnippet({extension, fileName, type})
		
					}
				}
		}, 
		helpText: `Special handler that's fired when the user uploads a file to your bot (by default supports json/csv/txt.) If you use the word "convert", it will convert a spreadsheet (.xlsx) file to an html preview`
	},

	{
		keyword: ['ping', 'pong'],
		handler(bot, trigger) {
			const normalized = trigger.text.toLowerCase()
			if (normalized === 'ping') {
				bot.say('pong')
			} else {
				bot.say('ping')
			}
		},
		helpText: `A handler that says ping when the user says pong and vice versa`
	},
	{
		keyword: '<@submit>',
		async handler(bot, trigger) {
			// Ex. From here data could be transmitted to another service or a 3rd-party integrationn
			bot.say(`Submission received! You sent us ${JSON.stringify(trigger.attachmentAction.inputs)}`)

			// ex counter
			const $bot = $(bot)
			await $bot.increaseCounter('myCounter')
			const counterRef = await $bot.getCounter('myCounter')
			$bot.thread(['Counter was increased', `The current count is ${counterRef}`])

		},
		helpText: `A special handler that fires anytime a user submits data (you can only trigger this handler by tapping Submit in a card)`
	},
	Namegamehandler, // You can also include single-file handlers in your list,
]

export default handlers;