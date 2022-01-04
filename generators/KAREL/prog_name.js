/*
* Code generation function for blocks in the control category.
*
*/

'use strict';

goog.provide('Blockly.KAREL.ProgName');

goog.require('Blockly.KAREL');

Blockly.KAREL['prog_name'] = function(block) {
  var text_prog_name = block.getFieldValue('prog_name');
  var statements_translator_directives = Blockly.KAREL.statementToCode(block, 'translator directives');
  var statements_declarations = Blockly.KAREL.statementToCode(block, 'declarations');
  var statements_routines = Blockly.KAREL.statementToCode(block, 'routines');
  var statements_begin = Blockly.KAREL.statementToCode(block, 'BEGIN');
  // TODO: Assemble JavaScript into code variable.
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
  code += 'BEGIN\n' + statements_begin + 'END ' + text_prog_name + '\n';
  return code;
};
