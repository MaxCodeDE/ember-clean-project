# ember-clean-project

An ember addon to find unused components, css classes etc.

## Installation

    ember install ember-clean-project

## Running
    
```sh
ember clear:components
```

You can add folowing parameters:
- `--force-delete` - Deletes the unused components, but copies a backup in /ember-clean-project/ folder (default: false)

## Config

When running the ember clear command, it is checked whether a config is exept, if not one is created.

```javascript
{
    "componentFolderPath": "./app/components"
}
```

You can add folowing parameters:
- `componentFolderPath` - Sets the component folder. If no pod structure is used the folder must be set by the comp-name.js data are set.

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
