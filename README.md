# eslint-plugin-tick-tock-jsdoc

Towards more useful jsdoc types: `{Object}`, `{Promise}` and `{*}` are unfortunate. Lets not use those.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-tick-tock-jsdoc`:

```
$ npm install eslint-plugin-tick-tock-jsdoc --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-tick-tock-jsdoc` globally.

## Usage

Add `tick-tock-jsdoc` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "tick-tock-jsdoc"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "tick-tock-jsdoc/tick-tock-jsdoc": 2
    }
}
```

## Supported Rules
 - Prohibit use of and provide guidance on `{Object}`, `{Promise}` and `{*}` ([tick-tock-jsdoc](docs/rules/tick-tock-jsdoc.md))
