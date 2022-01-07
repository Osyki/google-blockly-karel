goog.provide('KARELtoolbox');

'use strict';

var KARELtoolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "New",
            "colour":"290",
            "contents": [
                {
                    "kind": "block",
                    "type": "prog_name",
                },
            ],
        },
        {
            "kind": "category",
            "name": "Test Blocks",
            "contents": [
                {
                    "kind": "block",
                    "type": "karel_type",
                },
                {
                    "kind": "block",
                    "type": "STRUCTURE",
                },
            ],
        },
        {
            "kind": "category",
            "name": "Variables",
            "contents": [
                {
                    "kind": "block",
                    "type": "simple_var",
                },
            ],
        },
    ],
};
