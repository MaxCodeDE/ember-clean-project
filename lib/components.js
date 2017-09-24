const fs = require('fs');
const path = require('path');
const colors = require('colors');

var config = null;
var appPath = "./app/";
var components = null;

module.exports = {
    clearComponents(configModule) {
		config = configModule;
        console.log('Sart searching for unused components...'.green);
        console.log(' ');
        console.log(' ');
        // Setup Addon -> Get all components
        this.setup();
        // Start searching
        // TODO: Check if component isnt parent(extend) of other components
        this.checkUnusedComponents(appPath);
        // Log all unused components
        this.logUnusedComponentResult(components);
		// TODO: when --force-delete flag is set -> delete unused components und copy them to addon path /drafts(or something like that)
    },
    checkUnusedComponents(appPath) {
        var files = fs.readdirSync(appPath);
        files.forEach((item, index, array) => {
            var filename = path.join(appPath, files[index]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                this.checkUnusedComponents(filename);
            } else {
                if (filename.includes('.hbs')) {
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
    }
}
