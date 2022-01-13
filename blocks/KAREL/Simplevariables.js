/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @fileoverview Variable blocks for Blockly.

 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Constants.Simplevariables');

goog.require('Blockly.Blocks');
goog.require('Blockly');
goog.require('Blockly.Extensions');

/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg.COLOUR_HUE. (2018 April 5)
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    // Block for set simple data type
    {
        'type': 'simple_var',
        'message0': '%1 : %2',
        'args0': [
            {
                'type': 'field_variable',
                'name': 'var_name',
                'variable': 'var_name',
            },
            {
                'type': 'field_dropdown',
                'name': 'var_type',
                'options': [
                    [
                        'BOOLEAN',
                        'BOOLEAN',
                    ],
                    [
                        'FILE',
                        'FILE',
                    ],
                    [
                        'INTEGER',
                        'INTEGER',
                    ],
                    [
                        'REAL',
                        'REAL',
                    ],
                    [
                        'STRING',
                        'STRING',
                    ],
                ],
            },
        ],
        'output': 'variable',
        'previousStatement': null,
        'nextStatement': null,
        'colour': 230,
        'tooltip': '',
        'helpUrl': '',
        'extensions': ['test_extension'],
    },
]);  // END JSON EXTRACT (Do not delete this comment.)

/**
 * Mixin for mutator functions in the 'math_is_divisibleby_mutator'
 * extension.
 * @mixin
 * @augments Block
 * @package
 */
const IS_FILE_MIXIN = {
    /**
     * Create XML to represent whether the 'divisorInput' should be present.
     * Backwards compatible serialization implementation.
     * @return {!Element} XML storage element.
     * @this {Block}
     */
    mutationToDom: function() {
        // const container = Blockly.utils.xml.createElement('mutatetho');
        // const fileInput = (this.getFieldValue('var_type') === 'FILE');
        // container.setAttribute('isFile', fileInput);
        // return container;
    },
    // /**
    //  * Parse XML to restore the 'divisorInput'.
    //  * Backwards compatible serialization implementation.
    //  * @param {!Element} xmlElement XML storage element.
    //  * @this {Block}
    //  */
    domToMutation: function(xmlElement) {
        // const fileInput = (xmlElement.getAttribute('isFile') === 'true');
        // this.updateShape_(fileInput);
    },

    // This block does not need JSO serialization hooks (saveExtraState and
    // loadExtraState) because the state of this object is already encoded in the
    // dropdown values.
    // XML hooks are kept for backwards compatibility.

    /**
     * Modify this block to have (or not have) an input for 'is divisible by'.
     * @param {boolean} fileInput True if this block has a file input.
     * @private
     * @this {Block}
     */
    changeShape: function(fileInput) {
        // Add or remove a Value Input.
        // const fieldExists = this.getFieldValue('FILE_LOCATION');
        // if (fileInput) {
        //     if (!fieldExists) {
        //         this.appendDummyInput()
        //             .appendField(new Blockly.FieldTextInput("default"), "NAME");
        //     }
        // } else if (fieldExists) {
        //     this.getField('FILE_LOCATION');
        // }
    },
};
/**
 * 'math_is_divisibleby_mutator' extension to the 'math_property' block that
 * can update the block shape (add/remove divisor input) based on whether
 * property is "divisible by".
 * @this {Block}
 * @package
 */
const IS_FILE_EXTENSION = function() {
    this.getField('var_type')
        .setValidator(
            /**
             * @this {FieldDropdown}
             * @param {*} option The selected dropdown option.
             */
            function(option) {
                const fileInput = (option === 'FILE');
                // this.getSourceBlock().changeShape(fileInput);
            });
};

Blockly.Extensions.registerMutator('test_extension', IS_FILE_MIXIN, IS_FILE_EXTENSION);
