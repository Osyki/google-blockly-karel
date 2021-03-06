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
  const code = Blockly.KAREL.variableDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return [code, Blockly.KAREL.ORDER_ATOMIC];
};

Blockly.KAREL['variables_set'] = function(block) {
  // Variable setter.
  const argument0 = Blockly.KAREL.valueToCode(block, 'VALUE', Blockly.KAREL.ORDER_NONE) || '0';
  const varName = Blockly.KAREL.variableDB_.getName(block.getFieldValue('VAR'),  Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = ' + argument0 + '\n';
};
