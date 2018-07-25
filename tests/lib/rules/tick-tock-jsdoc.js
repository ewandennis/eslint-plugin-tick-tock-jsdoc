/**
 * @fileoverview Require well-defined objects and promises
 * @author Ewan Dennis
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/tick-tock-jsdoc"),  
    RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    }
    });

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("tick-tock-jsdoc", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: `
/**
* @param {Object} param
*/
function Splah() { }`,
            errors: [{
                message: "🕔 Please let us know whats in your object 🕔",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: `
/**
* @param {Object} param
*/
const Splah = function() { }`,
            errors: [{
                message: "🕔 Please let us know whats in your object 🕔",
                type: "FunctionExpression"
            }]
        },
        {
            code: `
/**
* @param {Object} anObject
*/
const Splah = x => x`,
            errors: [{
                message: "🕔 Please let us know whats in your object 🕔",
                type: "ArrowFunctionExpression"
            }]
        },

        {
            code: `
/**
* @param {Promise} aPromise
*/
function Splah() { }`,
            errors: [{
                message: "🕔 Please let us know how your promise resolves with Promise.<whatever> 🕔",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: `
/**
 * @returns {Object}
 */
function Splah() { }`,
            errors: [{
                message: "🕔 Please let us know whats in your object 🕔",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: `
/**
 * @returns {Promise}
 */
function Splah() { }`,
            errors: [{
                message: "🕔 Please let us know how your promise resolves with Promise.<whatever> 🕔",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: `
/**
 * @returns {*}
 */
function Splah() { }`,
            errors: [{
                message: "🕔 Please let us know whats in your object 🕔",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: `
/**
 * @param {Object}
 */
function Splah() { }`,
            errors: [{
                message: "🕔 Please let us know whats in your object 🕔",
                type: "FunctionDeclaration"
            }]
        }
    ]
});
