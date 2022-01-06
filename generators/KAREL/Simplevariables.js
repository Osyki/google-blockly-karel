/*
* Code generation function for blocks in the control category.
*
*/

'use strict';

goog.provide('Blockly.KAREL.Simplevariables');

goog.require('Blockly.KAREL');
// const {NameType} = goog.require('Blockly.Names');
// Blockly.KAREL['simple_var'] = function(block) {
//     var variable_name = Blockly.KAREL.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
//     var dropdown_name = block.getFieldValue('NAME');
//     // TODO: Assemble KAREL into code variable.
//     var code = '...;\n';
//     return code;
// };

Blockly.KAREL['simple_var'] = function(block) {
    // Variable setter.
    const argument0 = block.getFieldValue('var_type');
    const varName = Blockly.KAREL.nameDB_.getName(block.getFieldValue('var_name'), Blockly.VARIABLE_CATEGORY_NAME);
    return varName + ' : ' + argument0 + '\n';
};
