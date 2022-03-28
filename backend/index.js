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
const { responses } = require('./deploy_backend/responses')
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

const { join } = require('path')
const app = express()
app.use(cors())

const { port = process.env.PORT} = require('./../settings/config.json')
const {computerVisionService } = require('./util')

app.use('/', express.static(join(__dirname, 'ui')));

// app.use(express.static(join(__dirname, 'ui')));


// app.use("/custom", express.static(__dirname + "/ui"));

// app.use('/', express.static('/'));
// app.use("/custom", express.static(__dirname + "/custom"));
// app.use("/sassy", express.static(__dirname + "/sassy-app"));
// app.use(express.static('ui'))

// app.use(bodyParser.json());
app.post('/ping', (req, res) => res.send('pong!'))

//
// image recognition for file upload
app.post('/image_recognition', async (req, res) => {
    const { bytes={}, config={} } = req.body ? req.body : {}
    const result = await computerVisionService(bytes, config).catch(e => {
        res.status(500).send(e)
        console.log(e)  
    })

    res.status(200).send(result)
})

// Canned version
// icons
module.exports.iconList = [ "checklist","checklist_fade","close","close_fade","document","document_fade","engineer","engineer_fade","gear","gear_fade","group","group_fade","lock","lock_fade","question","question_fade","ribbon","ribbon_fade","toolbox","toolbox_fade","tree","tree_fade","warn","warn_fade","wrench","wrench_fade"]


let counter = 0 // "state"
app.post('/api_block', (req, res) => {
    const { step } = req.query
    if (step) {
        //
        counter = parseInt(step)
        if (responses[counter]) {
            res.status(200).send({step, ...responses[counter]})
        } else {
            res.status(200).send(responses[0])
        }
    } else {
        if (counter == responses.length - 1) {
            res.status(200).send(responses[counter])
            counter = 0
        } else {
            res.status(200).send(responses[counter])
            counter++
        }
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})