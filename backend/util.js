const rando = () => Math.random().toString(32).slice(2)
const { imageAPI, helpers } = require('./image_service')


const serviceAccountFilePath = helpers.buildPath(__dirname, '..', 'settings', 'service-account.json')

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




module.exports.computerVisionService = async (bytes) => {
    // Root config
    const haveAPI = false 
    // 
    const api = haveAPI ? imageAPI(serviceAccountFilePath) : fakeAPI

    if (haveAPI) {
        const labels = await api.analyze(bytes).catch(e => e)
        return labels
    } else {
        return api()
    }
}