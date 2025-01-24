const getArgs = require('./helpers/args')

const startCLI = () => {
    // console.log("start")
    // console.log(process.argv)
    const args = getArgs(process.argv)
    console.log(args)

    // console.log(process.argv)

    if(args.h) {
        // help
    }
    if(args.s) {
        // save city
    }
    if(args.t) {
        // save token
    }
    // result
}

startCLI()