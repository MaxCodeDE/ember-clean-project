/* eslint-env node */
'use strict';

const component = require('./lib/components');

module.exports = {
    name: 'ember-clean-project',
    includedCommands: function() {
        return {
            cleanComponentsCommand: {
                name: 'clear:components',
                description: 'Shows unused components',
                run: function(commandOptions, rawArgs) {
                    component.clearComponents();
                }
            },
            cleanCssCommand: {
                name: 'clean:css',
                description: 'A test command that says hello',
                availableOptions: [{
                    name: 'format',
                    type: String,
                    default: 'lowercase',
                    aliases: ['f']
                }],
                run: function(commandOptions, rawArgs) {
                    if (commandOptions.format === 'uppercase') {
                        console.log('HELLO!');
                    } else {
                        console.log('hello!');
                    }
                }
            }
        }
    }
};