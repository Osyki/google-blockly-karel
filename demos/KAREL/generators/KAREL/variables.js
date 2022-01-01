/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating KAREL for variable blocks.
 */
'use strict';

goog.module('Blockly.KAREL.variables');

const KAREL = goog.require('Blockly.KAREL');
const {NameType} = goog.require('Blockly.Names');


KAREL['variables_get'] = function(block) {
  // Variable getter.
  const code =
      KAREL.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
  return [code, KAREL.ORDER_ATOMIC];
};

KAREL['variables_set'] = function(block) {
  // Variable setter.
  const argument0 =
      KAREL.valueToCode(block, 'VALUE', KAREL.ORDER_NONE) || '0';
  const varName =
      KAREL.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
  return varName + ' : ' + argument0 + '\n';
};
