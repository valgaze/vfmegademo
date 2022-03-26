const rando = () => Math.random().toString(32).slice(2)
module.exports.computerVisionService = async (bytes) => {
    const haveAPI = false // we don't have a real api :()
    if (haveAPI) {
        if (bytes) {
            return {
                result: bytes
            }
        } 
    } else {

        const phonyResponseData = {
            deviceName: `bongo___${rando()}_${rando()}`,
            deviceId: rando(),
            deviceType: 'WFH_Collab',
        }

        return {
            ...phonyResponseData
        }
    }

}