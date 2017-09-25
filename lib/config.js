const fs = require('fs');
const path = require('path'); 
const colors = require('colors');

const configPath = "./ember-clean-project/"
const configFile = "config.json";

module.exports = {
    createConfig() {
        if (!fs.existsSync(configPath + configFile)) {
            fs.mkdirSync(configPath);
            fs.mkdirSync(configPath + "backup-components");
            fs.writeFileSync(configPath + configFile, this.getDefaultConfig());
            console.log("Config file created!".green);
        }
    },
	getConfigPropertyComponentFolderPath() {
		var configJson = JSON.parse(fs.readFileSync('./ember-clean-project/config.json', 'utf8'));
		return configJson.componentFolderPath;
	},
	getDefaultConfig() {
    	return '{ \n "componentFolderPath": "./app/components" \n }';
	},
    getConfigPath() {
        return configPath;
    }
}