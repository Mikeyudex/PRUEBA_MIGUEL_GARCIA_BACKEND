const chalk = require('chalk');
const moment = require('moment');

export default class ConsoleApp {
    private static appname:string = "Backend Users"

    static info(message:string, type:string = "INFO") {
        let dateTime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        console.log(`[${ dateTime }] [${ type }] ${ this.appname }: ${ message }`);
    }

    static start(message: string) {
        this.info(chalk.bold.green(message), "START");
    }

    static end(message: string) {
        this.info(chalk.bold.green(message), "END");
    }

    static error(message: string) {
        let dateTime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        console.error(`[${ dateTime }] [ERROR] ${ this.appname }: ${ chalk.red(message) }`);
        
    }
}

