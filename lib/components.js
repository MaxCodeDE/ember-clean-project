//const fs = require('fs');
const fs = require('fs-extra')
const path = require('path');
const colors = require('colors');

var config = null;
var appPath = "./app/";
var components = null;

module.exports = {
    clearComponents(configModule, forceDelete) {
		config = configModule;
        console.log('Sart searching for unused components...'.green);
        console.log(' ');
        console.log(' ');
        // Setup Addon -> Get all components
        this.setup();
        // Start searching
        this.checkUnusedComponents(appPath);
        // Log all unused components
        this.logUnusedComponentResult(components);
        if (forceDelete) {
            this.deleteUnusedComponents(components);
        }
    },
    checkUnusedComponents(appPath) {
        var files = fs.readdirSync(appPath);
        files.forEach((item, index, array) => {
            var filename = path.join(appPath, files[index]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                this.checkUnusedComponents(filename);
            } else {
                if (filename.includes('.hbs') || filename.includes('.js')) {
                    this.checkFileForComponent(filename);
                }
            }
        });
    },
    checkFileForComponent(filename) {
        var data = fs.readFileSync(filename, "utf8");
        components.forEach((item, index) => {
            if (data.indexOf(item) >= 0) {
                //console.log(item +  ' in ' + filename);
                delete components[index];
            }
        });
    },
    setup() {
		components = fs.readdirSync(config.getConfigPropertyComponentFolderPath());
        components.forEach((item, index, array) => {
        	array[index] = item.replace('.hbs', '');
        	array[index] = item.replace('.js', '');
        });
		this.logComponents(components);
    },
    logComponents(components) {
        console.log('Found components: '.grey + components.toString().grey);
        console.log(' ');
    },
    logUnusedComponentResult(components) {
        components.forEach((item) => {
            console.log(`Unused component -> ${item}`.red);
        });
    },
    deleteUnusedComponents(components) {
        components.forEach((item) => {
            fs.copy(config.getConfigPropertyComponentFolderPath() + `/${item}`, config.getConfigPath() + `/backup-components/${item}`, (copyError) => {
                if (copyError) return console.error(copyError)
                fs.remove(config.getConfigPropertyComponentFolderPath() + `/${item}`, (removeError) => {
                    if (removeError) return console.error(removeError);
                })
            });
        });
        console.log('All unused components have been deleted!'.green);
        console.log('A backup of all deleted components is saved under ./ember-clean-project/backup-components'.gray);
    }
}
