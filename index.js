// const getArgs = require('./helpers/args')
// const {printError, printSuccess} = require('./services/log.service.js')
import getArgs from './helpers/args.js'
import {printError, printSuccess, printHelp} from './services/log.service.js'
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'
import {getWeather} from './services/api.service.js'

const saveToken = async token => {
    if(!token.length) {
        printError("Token doesn't exist")
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token was saved')
    } catch (err) {
        printError(err.message)
    }
}

const saveCity = async city => {
    if(!city.length) {
        printError("City doesn't exist")
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City was saved')
    } catch (err) {
        printError(err.message)
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
        // const response = await getWeather(process.env.CITY ?? 'Uzbekistan')
        const response = await getWeather(city)
        console.log(response)
    } catch (err) {
        if(err?.response?.status == 404) {
            printError('City not found')
        } else if(err?.response?.status == 401) {
            printError('Invalid token')
        } else {
            printError(err.message)
        }
    }
}

const startCLI = () => {
    // console.log("start")
    // console.log(process.argv)
    const args = getArgs(process.argv)
    // console.log(args)

    // console.log(process.argv)

    // printSuccess('ok')
    // printError('no ok')
    // console.log(process.env)
    if(args.h) {
        // help
        return printHelp()
    }
    if(args.s) {
        // save city
        return saveCity(args.s)
    }
    if(args.t) {
        // save token
        // saveKeyValue('token', args.t)
        return saveToken(args.t)
    }
    // result
    return getForcast()
}

startCLI()