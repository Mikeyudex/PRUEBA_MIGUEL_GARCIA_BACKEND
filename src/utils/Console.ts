const chalk = require('chalk');
const moment = require('moment');

export default class ConsoleApp {
    public appname:string = "Projectify"

    public info(message:string, type:string = "INFO") {
        let dateTime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        console.log(`[${ dateTime }] [${ type }] ${ this.appname }: ${ message }`);
    }

    public start(message: string) {
        this.info(chalk.bold.green(message), "START");
    }

    public end(message: string) {
        this.info(chalk.bold.green(message), "END");
    }

    public error(message: string) {
        let dateTime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        console.error(`[${ dateTime }] [ERROR] ${ this.appname }: ${ chalk.red(message) }`);
        
    }
}

let tablaProyectos:object = {
    id_project: "juyiuy7478yuyuisd",
    nombre : "proyecto 1",
    creationDate: "hoy"
}

let Dedicacion:object = {
    _id_dedicacion : "1234",
    _userId: "miguel92",
    _Id_project: "45566",
    _percentDedication: "60%",
    creationDate: "hoy"
}