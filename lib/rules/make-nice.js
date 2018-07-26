/**
* @fileoverview Require well-defined objects and promises
* @author Ewan Dennis
*/
"use strict";

const doctrine = require('doctrine');

const checkedTags = ['param', 'returns'];
const prohibitedNames = {
  'promise': '🕔 Please let us know how your promise resolves with Promise.<whatever> 🕔',
  'object': '🕔 Please let us know whats in your object 🕔'
};
const allLiteralError = '🕔 Please let us know whats in your object 🕔';

const isDefined = x => !!x;

module.exports = {
  meta: {
    docs: {
      description: "Require well-defined objects and promises",
      category: "Stylistic issues",
      recommended: false
    },
    fixable: null,
    schema: []
  },
  
  create: function(context) {

   /**
     * Try to parse JSDoc from a given function definition.
     * @param {(FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)} - node an JSDoc AST node
     * @returns {{description: string, tags: Array}}
     */
    function jsdocFromNode(node) {
      // snf snf? JSDoc?
      const comment = context.getSourceCode().getJSDocComment(node);
      if (!comment) {
        return;
      }

      // _Valid_ JSDoc?
      let jsdoc;
      try {
        jsdoc = doctrine.parse(comment.value, {
          strict: true,
          unwrap: true,
          sloppy: true,
          range: true
        });
      } catch (e) {
        return null;
      }

      return jsdoc;
    }

    /**
     * Build a list of reports of degenerate JSDoc types in a given JSDoc tag list
     * @param {Array.<{title: string, name: string, type: Array}>} - jsdoc tags
     * @returns {Array.<String>}
     */
    function listDisappointingJSDocConstructs(jsdocTags) {
      const checked = jsdocTags.filter(tag => checkedTags.indexOf(tag.title) >= 0);

      // Dig through the tags for less than useful type specs where we like
      const reports = checked.map(tag => {
        // `@param {AType}`
        if (!tag.type) {
          if (tag.name) {
            const anonTypeName = tag.name.toLowerCase();
            if (anonTypeName in prohibitedNames) {
              return prohibitedNames[anonTypeName];
            }
          }
          return null;
        }

        // `@param {AType} - arg`
        // `@returns {AType}`
        const tagType = tag.type.type;
        if (tagType === 'NameExpression') {
          const typeName = tag.type.name.toLowerCase();
          if (typeName in prohibitedNames) {
            return prohibitedNames[typeName];
          }
          return null;
        }

        // `{*}`
        if (tagType === 'AllLiteral') {
          return allLiteralError;
        }

        return null;
      });

      return reports.filter(isDefined);
    }

    /**
     * Report on degenerate JSDoc types in a given function definition.
     * @param {(FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)} - node an JSDoc AST node
     */
    function reviewJSDocExpressions(node) {
      const jsdoc = jsdocFromNode(node);
      if (!jsdoc) {
        return;
      }

      const reports = listDisappointingJSDocConstructs(jsdoc.tags);
      reports.forEach(message => context.report({node, message}));
    }
    
    return {
      'FunctionDeclaration:exit': reviewJSDocExpressions,
      'FunctionExpression:exit': reviewJSDocExpressions,
      'ArrowFunctionExpression:exit': reviewJSDocExpressions
    };
  }
};