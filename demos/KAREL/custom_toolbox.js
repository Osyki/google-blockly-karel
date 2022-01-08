goog.provide('KARELtoolbox');

'use strict';

var KARELtoolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "New Program",
            "colour": "260",
            "contents": [
                {
                    "kind": "block",
                    "type": "prog_name",
                },
            ],
        },
        {
            "kind": "category",
            "name": "Comments",
            "contents": [
            ],
        },
        {
            "kind": "category",
            "name": "Directives",
            "contents": [
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
        {
            "kind": "category",
            "name": "Routine",
            "contents": [
            ],
        },
        {
            "kind": "category",
            "name": "Structures",
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
    ],
};
