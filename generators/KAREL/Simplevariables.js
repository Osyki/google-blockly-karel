/*
* Code generation function for blocks in the control category.
*
*/

'use strict';

goog.provide('Blockly.KAREL.Simplevariables');

goog.require('Blockly.KAREL');

Blockly.KAREL['simple_var'] = function(block) {
    // Variable setter.
    const argument0 = block.getFieldValue('var_type');
    const varName = Blockly.KAREL.nameDB_.getName(block.getFieldValue('var_name'), Blockly.VARIABLE_CATEGORY_NAME);
    return varName + ' : ' + argument0 + '\n';
};
