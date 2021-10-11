const mongoose = require('mongoose');
import ConsoleApp from "../utils/Console";



const ConnectDatabase = () => {
    mongoose.connect('mongodb://localhost/lyaelectronic')
        .then(db => {
            ConsoleApp.info('Database Connected')
        })
        .catch(err => ConsoleApp.error(err))
}

module.exports = ConnectDatabase;
