goog.provide('KARELtoolbox');

'use strict';

const KARELToolbox = {
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
                {
                    "kind": "block",
                    "type": "variables_get",
                },
                {
                    "kind": "block",
                    "type": "variables_set",
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
            "name": "Select",
            "contents": [
                {
                    "kind": "block",
                    "type": "karel_case",
                },
            ],
        },
        {
            "kind": "category",
            "name": "Math",
            "contents": [
                {
                    "kind": "block",
                    "type": "math_number",
                },
                // {
                //     "kind": "block",
                //     "type": "math_arithmetic",
                // },
                // {
                //     "kind": "block",
                //     "type": "math_single",
                // },
                // {
                //     "kind": "block",
                //     "type": "math_trig",
                // },
                {
                    "kind": "block",
                    "type": "math_constant",
                },
                // {
                //     "kind": "block",
                //     "type": "math_number_property",
                // },
                // {
                //     "kind": "block",
                //     "type": "math_change",
                // },
                {
                    "kind": "block",
                    "type": "math_round",
                },
                // {
                //     "kind": "block",
                //     "type": "math_on_list",
                // },
                {
                    "kind": "block",
                    "type": "math_modulo",
                },
                {
                    "kind": "block",
                    "type": "math_constrain",
                },
                {
                    "kind": "block",
                    "type": "math_random_int",
                },
                {
                    "kind": "block",
                    "type": "math_random_float",
                },
                {
                    "kind": "block",
                    "type": "math_atan2",
                },
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

const blankToolbox = {
    "kind": "categoryToolbox",
    "contents": [],
};
