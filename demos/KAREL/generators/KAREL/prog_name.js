/**
 * @fileoverview Generator file for arduino code variables
 */

'use strict';

goog.provide('Blockly.Arduino.ProgName');

goog.require('Blockly.KAREL');

Blockly.KAREL['prog_name'] = function(block) {
  var text_prog_name = block.getFieldValue('prog_name');
  var statements_translator_directives = Blockly.JavaScript.statementToCode(block, 'translator directives');
  var statements_declarations = Blockly.JavaScript.statementToCode(block, 'declarations');
  var statements_routines = Blockly.JavaScript.statementToCode(block, 'routines');
  var statements_begin = Blockly.JavaScript.statementToCode(block, 'BEGIN');
  // TODO: Assemble KAREL into code variable.
  var code = 'PROGRAM ' + text_prog_name + '\n';

  if (statements_translator_directives) {
    code += statements_translator_directives;
  }
  if (statements_declarations) {
    code += statements_declarations;
  }
  if (statements_routines) {
    code += statements_routines;
  }

  code += 'BEGIN' + '\n' +statements_begin + '\n' + 'END ' + text_prog_name + '\n';
  return code;
};
