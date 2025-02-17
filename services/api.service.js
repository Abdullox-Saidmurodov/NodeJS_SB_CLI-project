// import https from 'https'
import axios from 'axios'
import {getKeyValue, TOKEN_DICTIONARY} from './storage.service.js'

const getWeather = async city => {
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token))
    if(!token) {
        throw new Error("API doesn't exist, -t [API_KEY] for saving token")
    }

    // const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    // url.searchParams.append('q', city)
    // url.searchParams.append('appid', token)
    // url.searchParams.append('lang', 'en')
    // url.searchParams.append('units', 'metric')

    // https.get(url, (response) => {
    //     let res = ''
    //     response.on('data', chunk => {
    //         res += chunk
    //     })
    //     response.on('end', () => {
    //         console.log(res)
    //     })
    // })

    // const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'en',
            units: 'metric',
        }
    })

    // console.log(data)
    return data
}

export {getWeather}