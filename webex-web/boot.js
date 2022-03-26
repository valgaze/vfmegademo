// Boot the server?

const {placeholder, loud} = require('speedybot')
const {cli} = require('cli-ux')
const { resolve } = require('path')

const { token, port, space_id} = require('./../settings/config.json')


const { serveDir } = require('./static')

const ui_dir = resolve(__dirname, 'ui')
let ui_path = resolve(ui_dir, 'index.html')

async function main(filePath, port) {
let address = `http://localhost:${port}/index.html`
loud(`Running on ${port}
${address}`)

    await serveDir(ui_dir, port)

    // attempt to open w/ token
    if (token !== placeholder) {
        // append token
        address = `${address}?access_id=${token}`
    }

    // attempt to open w/ space_id
    if (space_id !== placeholder) {
        // append space_id
        address = `${address}&room_id=${space_id}`
    }
    await cli.open(address) 
    await cli.anykey().catch(e => { { console.log('Exiting...'); process.exit(0) }})
}

// Launch server
main(ui_path, port)
