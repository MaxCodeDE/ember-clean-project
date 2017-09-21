const fs = require('fs');
const path = require('path');
const colors = require('colors');

var componentsFolder = './app/components/';
var appPath = "./app/";

var components = null;

module.exports = {
    clearComponents() {
        console.log('Sart searching for unused components...'.green);
        // Setup
        this.setup();
        // Start searching
        this.checkUnusedComponents(appPath);
        // Log all unused components
        components.forEach((item) => {
            console.log(`Unused component -> ${item}`);
        });
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
        // Check if POD or not
        if (fs.existsSync(appPath + "components")) {
            // Get all names of components and set it
            components = fs.readdirSync(componentsFolder);
            // TODO: Check if component isnt parent(extend) of other components
        }  else if (s.existsSync(appPath + "templates/components")) {
            console.log('TODO: impl. no pod');
        }
    }
}