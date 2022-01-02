/**
 * @license
 * Copyright 2012 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating KAREL for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.KAREL.variables');

goog.require('Blockly.KAREL');


Blockly.KAREL['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.KAREL.variableDB_.getName(block.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  return [code, Blockly.KAREL.ORDER_ATOMIC];
};

Blockly.KAREL['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.KAREL.valueToCode(block, 'VALUE',
    Blockly.KAREL.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.KAREL.variableDB_.getName(
    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' : ' + argument0 + '\n';
};

/**
 * Boolean Variables
 * @type {{init: Blockly.Blocks.boolean.init}}
 */
Blockly.Blocks['boolean'] = {
  init: function() {
    this.appendStatementInput("boolean")
        .setCheck("boolean")
        .appendField(new Blockly.FieldVariable("boolVar"), "boolVarName")
        .appendField(new Blockly.FieldDropdown([["logic","logic"], ["state","state"]]), "state/logic")
        .appendField(new Blockly.FieldDropdown([["TRUE","true"], ["FALSE","false"]]), "logic")
        .appendField(new Blockly.FieldDropdown([["ON","on"], ["OFF","off"]]), "state");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/**
 * 
 * @param block
 * @returns {string}
 */
Blockly.KAREL['boolean'] = function(block) {
  var variable_boolvarname = Blockly.KAREL.nameDB_.getName(block.getFieldValue('boolVarName'), Blockly.Variables.NAME_TYPE);
  var dropdown_state_logic = block.getFieldValue('state/logic');
  var dropdown_logic = block.getFieldValue('logic');
  var dropdown_state = block.getFieldValue('state');
  var statements_boolean = Blockly.KAREL.statementToCode(block, 'boolean');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
