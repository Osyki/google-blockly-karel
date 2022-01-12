/*
* Code generation function for blocks in the control category.
*
*/

'use strict';

goog.provide('Blockly.KAREL.select');

goog.require('Blockly.KAREL');

Blockly.KAREL['karel_case'] = function(block) {
    var text_case = block.getFieldValue('CASE');
    var statements_name = Blockly.KAREL.statementToCode(block, 'NAME');
    return 'CASE(' + text_case +') :\n  RETURN('+statements_name + ')\n';
};
