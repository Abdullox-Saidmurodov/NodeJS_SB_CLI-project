// const getArgs = require('./helpers/args')
// const {printError, printSuccess} = require('./services/log.service.js')
import getArgs from './helpers/args.js'
import {printError, printSuccess, printHelp} from './services/log.service.js'
import { saveKeyValue } from './services/storage.service.js'

const saveToken = async token => {
    try {
        await saveKeyValue('token', token)
        printSuccess('Token was saved')
    } catch (err) {
        printError(err.message)
    }
}

const startCLI = () => {
    // console.log("start")
    // console.log(process.argv)
    const args = getArgs(process.argv)
    console.log(args)

    // console.log(process.argv)

    // printSuccess('ok')
    // printError('no ok')
    if(args.h) {
        // help
        printHelp()
    }
    if(args.s) {
        // save city
    }
    if(args.t) {
        // save token
        // saveKeyValue('token', args.t)
        return saveToken(args.t)
    }
    // result
}

startCLI()