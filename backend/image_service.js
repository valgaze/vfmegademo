// npm i @google-cloud
// service-account.json, get file w/ computer vison from here: https://cloud.google.com/docs/authentication/production
const vision = require('@google-cloud/vision');
const { resolve } = require('path');
const { exsits, writeFileSync } = require('fs')


class ImageAnalysis {
    constructor(serviceAccountFilePath) {
        this.envName = 'GOOGLE_APPLICATION_CREDENTIALS'
        this.serviceAccountFilePath = serviceAccountFilePath;
        this._setAuth(this.serviceAccountFilePath)
        this.client = new vision.ImageAnnotatorClient();
    }

    _setAuth(fullPath) {
        // Hack for obnoxious google cloud client library requirement
        process.env[this.envName] = fullPath
        if (process.env[this.envName] !== fullPath) {
            throw new Error(`${this.envName} environment variable not set.`)
        }
    }

    async analyze(imageDataOrPath) {
        const [result] = await this.client.labelDetection(imageDataOrPath).catch(e => {
            const { message } = e;
            if (e.message.includes('the default credentials.')) {
                throw new Error(`Please set the ${this.envName} environment variable.`);
            } else {
                throw e
            }
        });
        const labels = result.labelAnnotations; // labels.forEach(label => console.log(label.description));

        return labels
    }

    async writeBytesToFile(bytes, filePath) {
        return writeFileSync(filePath, bytes)
    }

}

//Static helpers
ImageAnalysis.prototype.exists = async function (path) {
    return new Promise(resolve => {
        fs.exists('/etc/geeks', (res) => {
            return resolve(res)
        });        
    })
}
ImageAnalysis.prototype.buildPath = (...pieces) => resolve(...pieces)



ImageAnalysis.prototype.validateCredentials = async function (serviceAccountFilePath) {
    const filePath = resolve(__dirname, serviceAccountFilePath);
    const exists = await ImageAnalysis.exists(filePath);
    return exists;
}

ImageAnalysis.prototype.writeBuffer = (fileName, buffer) => {
    try {
        return writeFileSync(fileName, buffer)        
    }catch(e){
        throw e
    }
}
module.exports.imageAPI = (serviceAccountFilePath) => {
    return new ImageAnalysis(serviceAccountFilePath)
}

module.exports.helpers = {
    validateCredentials: async (serviceAccountFilePath) => {
        return ImageAnalysis.prototype.validateCredentials(serviceAccountFilePath)
    },
    buildPath: (...pieces) => ImageAnalysis.prototype.buildPath(...pieces),
    writeBuffer: (fileName, buffer) => ImageAnalysis.prototype.writeBuffer(fileName, buffer),
}


module.exports.ImageAnalysis = ImageAnalysis;

module.exports.fastAnalyze = async (bytes, serviceAccountFilePath) => {
    const inst = new ImageAnalysis(serviceAccountFilePath)
    try {
        const res = await inst.analyze(bytes)
        return res
    } catch (e) {
        console.log(e)
        return e
    }
}