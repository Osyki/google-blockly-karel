/*
* Code generation function for blocks in the control category.
*
*/

'use strict';

goog.provide('Blockly.KAREL.TYPE');

goog.require('Blockly.KAREL');

Blockly.KAREL['karel_type'] = function (block) {
    let statements_karel_structure = Blockly.KAREL.statementToCode(block, 'KAREL_structure');
    let code = 'TYPE\n' + statements_karel_structure;
    return code;
};

Blockly.KAREL['STRUCTURE'] = function(block) {
    var variable_name = Blockly.KAREL.nameDB_.getName(block.getFieldValue('NAME'), Blockly.VARIABLE_CATEGORY_NAME);
    var statements_karel_varname = Blockly.KAREL.statementToCode(block, 'KAREL_varname');
    var code = variable_name + ' = STRUCTURE\n'+ statements_karel_varname + 'ENDSTRUCTURE\n';
    return code;
};
