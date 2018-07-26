# Informative JSDoc (make-nice)

JSDoc allows you to specify types for parameters, return values and so on. Unfortunately JSDoc also lets you pretend to write docs by using types like `Object`, `Promise` or even `*`, none of which contribute much in the way of actual documentation. Here's why:

- `Object` - Almost everything in JS is an object if you squint.
- `Promise` - more of an intermediate value. It'd be great to know what it resolves to though.
- `*` - this could mean anything.

This rule checks that JSDoc `@param` an `@returns` tags include some real detail.

## Rule Details

Examples of **incorrect** code for this rule:

```js
/**
 * @param {*} - wildcard
 * @param {Object} - options
 * @returns {Promise}
 */
function myThingDoesStuff(wildcard, options) {
  return Promise.resolve(options.e || 2.71);
}
```

Examples of **correct** code for this rule:

```js
/**
 * @param {string} - wildcard
 * @param {({E: Number})} - options
 * @returns {Promise.<Number>} returns E
 */
function myThingDoesStuff(options) {
  return Promise.resolve(options.e || 2.71);
}
```

## When Not To Use It

If you aren't using JSDoc, you don't need this.

## Further Reading

[Here are all the ways you can specify your types in JSDoc](http://usejsdoc.org/tags-type.html).

[TypeScript](https://www.typescriptlang.org/)

[Flow](https://flow.org/en/)
