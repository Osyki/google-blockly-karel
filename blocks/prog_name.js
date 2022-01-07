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

goog.provide('Blockly.Constants.ProgName');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg.COLOUR_HUE. (2018 April 5)
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    // Block for Begin Program.
    {
        "type": "prog_name",
        "message0": "PROGRAM %1 %2 Directives %3 Declarations %4 Routines %5 BEGIN %6 END",
        "args0": [
            {
                "type": "field_input",
                "name": "prog_name",
                "text": "prog_name"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "translator directives",
                "check": "Directives",
                "align": "RIGHT"
            },
            {
                "type": "input_statement",
                "name": "declarations",
                "check": "Declarations",
                "align": "RIGHT"
            },
            {
                "type": "input_statement",
                "name": "routines",
                "check": "Routines",
                "align": "RIGHT"
            },
            {
                "type": "input_statement",
                "name": "BEGIN"
            }
        ],
        "inputsInline": false,
        "nextStatement": "Routines",
        "colour": 260,
        "tooltip": "",
        "helpUrl": ""
    },
]);  // END JSON EXTRACT (Do not delete this comment.)
