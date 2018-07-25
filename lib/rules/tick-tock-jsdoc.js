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
     * Report on degenerate JSDoc types in a given function definition.
     * @param {(FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)} - node an JSDoc AST node
     */
    function reviewJSDocExpressions(node) {
      const comment = context.getSourceCode().getJSDocComment(node);
      if (!comment) {
        return;
      }

      let jsdoc;
      try {
        jsdoc = doctrine.parse(comment.value, {
          strict: true,
          unwrap: true,
          sloppy: true,
          range: true
        });
      } catch (e) {
        return [];
      }

      const checked = jsdoc.tags.filter(tag => checkedTags.indexOf(tag.title) >= 0);
      const reports = checked.map(tag => {
        if (!tag.type) {
          // `@param {YourType}` without a param name
          const anonTypeName = tag.name.toLowerCase();
          if (anonTypeName in prohibitedNames) {
            return {node, message: prohibitedNames[anonTypeName]};
          }
          return null;
        }
        
        const tagType = tag.type.type;

        if (tagType === 'NameExpression') {
          const typeName = tag.type.name.toLowerCase();
          if (typeName in prohibitedNames) {
            return {node, message: prohibitedNames[typeName]};
          }
          return null;
        }

        if (tagType === 'AllLiteral') {
          return {node, message: allLiteralError};
        }

        return null;
      }).filter(isDefined);

      reports.forEach(report => {
        context.report(report);
      });
    }
    
    return {
      'FunctionDeclaration:exit': reviewJSDocExpressions,
      'FunctionExpression:exit': reviewJSDocExpressions,
      'ArrowFunctionExpression:exit': reviewJSDocExpressions
    };
  }
};