const fs = require('fs');
const path = require('path'); 
const colors = require('colors');

const configPath = "./ember-clean-project/"
const configFile = "config.json";

module.exports = {
    createConfig() {
        var env = require('./config/environment');
        return;
        if (!fs.existsSync(configPath + configFile)) {
            fs.mkdirSync(configPath);
            fs.writeFile(configPath + configFile, getDefaultConfig(), function(err) {
                if(err) {
                    return console.log('TEST' + err);
                }

                console.log("Config file created!".green);
            }); 
        }
    }
}


function getDefaultConfig() {
    return '{ "componentFolderPath": "./app/components" }';
}