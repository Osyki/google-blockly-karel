/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating Blockly.KAREL for math blocks.
 */
'use strict';
goog.provide('Blockly.KAREL.math');
goog.require('Blockly.KAREL');

Blockly.KAREL['math_number'] = function(block) {
    // Numeric value.
    const code = Number(block.getFieldValue('NUM'));
    const order = code < 0 ? Blockly.KAREL.ORDER_UNARY : Blockly.KAREL.ORDER_ATOMIC;
    return [code, order];
};

Blockly.KAREL['math_arithmetic'] = function(block) {
    // Basic arithmetic operators, and power.
    const OPERATORS = {
        ADD: [' + ', Blockly.KAREL.ORDER_ADDITIVE],
        MINUS: [' - ', Blockly.KAREL.ORDER_ADDITIVE],
        MULTIPLY: [' * ', Blockly.KAREL.ORDER_MULTIPLICATIVE],
        DIVIDE: [' / ', Blockly.KAREL.ORDER_MULTIPLICATIVE],
        POWER: [' ^ ', Blockly.KAREL.ORDER_EXPONENTIATION]
    };
    const tuple = OPERATORS[block.getFieldValue('OP')];
    const operator = tuple[0];
    const order = tuple[1];
    const argument0 = Blockly.KAREL.valueToCode(block, 'A', order) || '0';
    const argument1 = Blockly.KAREL.valueToCode(block, 'B', order) || '0';
    const code = argument0 + operator + argument1;
    return [code, order];
};

Blockly.KAREL['math_single'] = function(block) {
    // Math operators with single operand.
    const operator = block.getFieldValue('OP');
    let arg;
    if (operator === 'NEG') {
        // Negation is a special case given its different operator precedence.
        arg = Blockly.KAREL.valueToCode(block, 'NUM', Blockly.KAREL.ORDER_UNARY) || '0';
        return ['-' + arg, Blockly.KAREL.ORDER_UNARY];
    }
    if (operator === 'POW10') {
        arg = Blockly.KAREL.valueToCode(block, 'NUM', Blockly.KAREL.ORDER_EXPONENTIATION) || '0';
        return ['10 ^ ' + arg, Blockly.KAREL.ORDER_EXPONENTIATION];
    }
    if (operator === 'ROUND') {
        arg = Blockly.KAREL.valueToCode(block, 'NUM', Blockly.KAREL.ORDER_ADDITIVE) || '0';
    } else {
        arg = Blockly.KAREL.valueToCode(block, 'NUM', Blockly.KAREL.ORDER_NONE) || '0';
    }

    let code;
    switch (operator) {
        case 'ABS':
            code = 'math.abs(' + arg + ')';
            break;
        case 'ROOT':
            code = 'math.sqrt(' + arg + ')';
            break;
        case 'LN':
            code = 'math.log(' + arg + ')';
            break;
        case 'LOG10':
            code = 'math.log(' + arg + ', 10)';
            break;
        case 'EXP':
            code = 'math.exp(' + arg + ')';
            break;
        case 'ROUND':
            // This rounds up.  Blockly does not specify rounding direction.
            code = 'math.floor(' + arg + ' + .5)';
            break;
        case 'ROUNDUP':
            code = 'math.ceil(' + arg + ')';
            break;
        case 'ROUNDDOWN':
            code = 'math.floor(' + arg + ')';
            break;
        case 'SIN':
            code = 'math.sin(math.rad(' + arg + '))';
            break;
        case 'COS':
            code = 'math.cos(math.rad(' + arg + '))';
            break;
        case 'TAN':
            code = 'math.tan(math.rad(' + arg + '))';
            break;
        case 'ASIN':
            code = 'math.deg(math.asin(' + arg + '))';
            break;
        case 'ACOS':
            code = 'math.deg(math.acos(' + arg + '))';
            break;
        case 'ATAN':
            code = 'math.deg(math.atan(' + arg + '))';
            break;
        default:
            throw Error('Unknown math operator: ' + operator);
    }
    return [code, Blockly.KAREL.ORDER_HIGH];
};

Blockly.KAREL['math_constant'] = function(block) {
    // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
    const CONSTANTS = {
        PI: ['math.pi', Blockly.KAREL.ORDER_HIGH],
        E: ['math.exp(1)', Blockly.KAREL.ORDER_HIGH],
        GOLDEN_RATIO: ['(1 + math.sqrt(5)) / 2', Blockly.KAREL.ORDER_MULTIPLICATIVE],
        SQRT2: ['math.sqrt(2)', Blockly.KAREL.ORDER_HIGH],
        SQRT1_2: ['math.sqrt(1 / 2)', Blockly.KAREL.ORDER_HIGH],
        INFINITY: ['math.huge', Blockly.KAREL.ORDER_HIGH]
    };
    return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Blockly.KAREL['math_number_property'] = function(block) {
    // Check if a number is even, odd, prime, whole, positive, or negative
    // or if it is divisible by certain number. Returns true or false.
    const number_to_check =
        Blockly.KAREL.valueToCode(block, 'NUMBER_TO_CHECK', Blockly.KAREL.ORDER_MULTIPLICATIVE) ||
        '0';
    const dropdown_property = block.getFieldValue('PROPERTY');
    let code;
    if (dropdown_property === 'PRIME') {
        // Prime is a special case as it is not a one-liner test.
        const functionName = Blockly.KAREL.provideFunction_('math_isPrime', [
            'function ' + Blockly.KAREL.FUNCTION_NAME_PLACEHOLDER_ + '(n)',
            '  -- https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
            '  if n == 2 or n == 3 then', '    return true', '  end',
            '  -- False if n is NaN, negative, is 1, or not whole.',
            '  -- And false if n is divisible by 2 or 3.',
            '  if not(n > 1) or n % 1 ~= 0 or n % 2 == 0 or n % 3 == 0 then',
            '    return false', '  end',
            '  -- Check all the numbers of form 6k +/- 1, up to sqrt(n).',
            '  for x = 6, math.sqrt(n) + 1.5, 6 do',
            '    if n % (x - 1) == 0 or n % (x + 1) == 0 then', '      return false',
            '    end', '  end', '  return true', 'end'
        ]);
        code = functionName + '(' + number_to_check + ')';
        return [code, Blockly.KAREL.ORDER_HIGH];
    }
    switch (dropdown_property) {
        case 'EVEN':
            code = number_to_check + ' % 2 == 0';
            break;
        case 'ODD':
            code = number_to_check + ' % 2 == 1';
            break;
        case 'WHOLE':
            code = number_to_check + ' % 1 == 0';
            break;
        case 'POSITIVE':
            code = number_to_check + ' > 0';
            break;
        case 'NEGATIVE':
            code = number_to_check + ' < 0';
            break;
        case 'DIVISIBLE_BY': {
            const divisor =
                Blockly.KAREL.valueToCode(block, 'DIVISOR', Blockly.KAREL.ORDER_MULTIPLICATIVE);
            // If 'divisor' is some code that evals to 0, Blockly.KAREL will produce a nan.
            // Let's produce nil if we can determine this at compile-time.
            if (!divisor || divisor === '0') {
                return ['nil', Blockly.KAREL.ORDER_ATOMIC];
            }
            // The normal trick to implement ?: with and/or doesn't work here:
            //   divisor == 0 and nil or number_to_check % divisor == 0
            // because nil is false, so allow a runtime failure. :-(
            code = number_to_check + ' % ' + divisor + ' == 0';
            break;
        }
    }
    return [code, Blockly.KAREL.ORDER_RELATIONAL];
};

Blockly.KAREL['math_change'] = function(block) {
    // Add to a variable in place.
    const argument0 = Blockly.KAREL.valueToCode(block, 'DELTA', Blockly.KAREL.ORDER_ADDITIVE) || '0';
    const varName =
        Blockly.KAREL.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.VARIABLE);
    return varName + ' = ' + varName + ' + ' + argument0 + '\n';
};

// Rounding functions have a single operand.
Blockly.KAREL['math_round'] = Blockly.KAREL['math_single'];
// Trigonometry functions have a single operand.
Blockly.KAREL['math_trig'] = Blockly.KAREL['math_single'];

Blockly.KAREL['math_on_list'] = function(block) {
    // Math functions for lists.
    const func = block.getFieldValue('OP');
    const list = Blockly.KAREL.valueToCode(block, 'LIST', Blockly.KAREL.ORDER_NONE) || '{}';
    let functionName;

    // Functions needed in more than one case.
    function provideSum() {
        return Blockly.KAREL.provideFunction_('math_sum', [
            'function ' + Blockly.KAREL.FUNCTION_NAME_PLACEHOLDER_ + '(t)',
            '  local result = 0', '  for _, v in ipairs(t) do',
            '    result = result + v', '  end', '  return result', 'end'
        ]);
    }

    switch (func) {
        case 'SUM':
            functionName = provideSum();
            break;

        case 'MIN':
            // Returns 0 for the empty list.
            functionName = Blockly.KAREL.provideFunction_('math_min', [
                'function ' + Blockly.KAREL.FUNCTION_NAME_PLACEHOLDER_ + '(t)',
                '  if #t == 0 then', '    return 0', '  end',
                '  local result = math.huge', '  for _, v in ipairs(t) do',
                '    if v < result then', '      result = v', '    end', '  end',
                '  return result', 'end'
            ]);
            break;

        case 'AVERAGE':
            // Returns 0 for the empty list.
            functionName = Blockly.KAREL.provideFunction_('math_average', [
                'function ' + Blockly.KAREL.FUNCTION_NAME_PLACEHOLDER_ + '(t)',
                '  if #t == 0 then', '    return 0', '  end',
                '  return ' + provideSum() + '(t) / #t', 'end'
            ]);
            break;

        case 'MAX':
            // Returns 0 for the empty list.
            functionName = Blockly.KAREL.provideFunction_('math_max', [
                'function ' + Blockly.KAREL.FUNCTION_NAME_PLACEHOLDER_ + '(t)',
                '  if #t == 0 then', '    return 0', '  end',
                '  local result = -math.huge', '  for _, v in ipairs(t) do',
                '    if v > result then', '      result = v', '    end', '  end',
                '  return result', 'end'
            ]);
            break;

        case 'MEDIAN':
            functionName = Blockly.KAREL.provideFunction_(
                'math_median',
                // This operation excludes non-numbers.
                [
                    'function ' + Blockly.KAREL.FUNCTION_NAME_PLACEHOLDER_ + '(t)',
                    '  -- Source: http://Blockly.KAREL-users.org/wiki/SimpleStats',
                    '  if #t == 0 then', '    return 0', '  end', '  local temp={}',
                    '  for _, v in ipairs(t) do', '    if type(v) == "number" then',
                    '      table.insert(temp, v)', '    end', '  end',
                    '  table.sort(temp)', '  if #temp % 2 == 0 then',
                    '    return (temp[#temp/2] + temp[(#temp/2)+1]) / 2', '  else',
                    '    return temp[math.ceil(#temp/2)]', '  end', 'end'
                ]);
            break;

        case 'MODE':
            functionName = Blockly.KAREL.provideFunction_(
                'math_modes',
                // As a list of numbers can contain more than one mode,
                // the returned result is provided as an array.
                // The Blockly.KAREL version includes non-numbers.
                [
                    'function ' + Blockly.KAREL.FUNCTION_NAME_PLACEHOLDER_ + '(t)',
                    '  -- Source: http://Blockly.KAREL-users.org/wiki/SimpleStats',
                    '  local counts={}',
                    '  for _, v in ipairs(t) do',
                    '    if counts[v] == nil then',
                    '      counts[v] = 1',
                    '    else',
                    '      counts[v] = counts[v] + 1',
                    '    end',
                    '  end',
                    '  local biggestCount = 0',
                    '  for _, v  in pairs(counts) do',
                    '    if v > biggestCount then',
                    '      biggestCount = v',
                    '    end',
                    '  end',
                    '  local temp={}',
                    '  for k, v in pairs(counts) do',
                    '    if v == biggestCount then',
                    '      table.insert(temp, k)',
                    '    end',
                    '  end',
                    '  return temp',
                    'end'
                ]);
            break;

        case 'STD_DEV':
            functionName = Blockly.KAREL.provideFunction_('math_standard_deviation', [
                'function ' + Blockly.KAREL.FUNCTION_NAME_PLACEHOLDER_ + '(t)', '  local m',
                '  local vm', '  local total = 0', '  local count = 0',
                '  local result', '  m = #t == 0 and 0 or ' + provideSum() + '(t) / #t',
                '  for _, v in ipairs(t) do', '    if type(v) == \'number\' then',
                '      vm = v - m', '      total = total + (vm * vm)',
                '      count = count + 1', '    end', '  end',
                '  result = math.sqrt(total / (count-1))', '  return result', 'end'
            ]);
            break;

        case 'RANDOM':
            functionName = Blockly.KAREL.provideFunction_('math_random_list', [
                'function ' + Blockly.KAREL.FUNCTION_NAME_PLACEHOLDER_ + '(t)',
                '  if #t == 0 then', '    return nil', '  end',
                '  return t[math.random(#t)]', 'end'
            ]);
            break;

        default:
            throw Error('Unknown operator: ' + func);
    }
    return [functionName + '(' + list + ')', Blockly.KAREL.ORDER_HIGH];
};

Blockly.KAREL['math_modulo'] = function(block) {
    // Remainder computation.
    const argument0 =
        Blockly.KAREL.valueToCode(block, 'DIVIDEND', Blockly.KAREL.ORDER_MULTIPLICATIVE) || '0';
    const argument1 =
        Blockly.KAREL.valueToCode(block, 'DIVISOR', Blockly.KAREL.ORDER_MULTIPLICATIVE) || '0';
    const code = argument0 + ' % ' + argument1;
    return [code, Blockly.KAREL.ORDER_MULTIPLICATIVE];
};

Blockly.KAREL['math_constrain'] = function(block) {
    // Constrain a number between two limits.
    const argument0 = Blockly.KAREL.valueToCode(block, 'VALUE', Blockly.KAREL.ORDER_NONE) || '0';
    const argument1 =
        Blockly.KAREL.valueToCode(block, 'LOW', Blockly.KAREL.ORDER_NONE) || '-math.huge';
    const argument2 =
        Blockly.KAREL.valueToCode(block, 'HIGH', Blockly.KAREL.ORDER_NONE) || 'math.huge';
    const code = 'math.min(math.max(' + argument0 + ', ' + argument1 + '), ' +
        argument2 + ')';
    return [code, Blockly.KAREL.ORDER_HIGH];
};

Blockly.KAREL['math_random_int'] = function(block) {
    // Random integer between [X] and [Y].
    const argument0 = Blockly.KAREL.valueToCode(block, 'FROM', Blockly.KAREL.ORDER_NONE) || '0';
    const argument1 = Blockly.KAREL.valueToCode(block, 'TO', Blockly.KAREL.ORDER_NONE) || '0';
    const code = 'math.random(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.KAREL.ORDER_HIGH];
};

Blockly.KAREL['math_random_float'] = function(block) {
    // Random fraction between 0 and 1.
    return ['math.random()', Blockly.KAREL.ORDER_HIGH];
};

Blockly.KAREL['math_atan2'] = function(block) {
    // Arctangent of point (X, Y) in degrees from -180 to 180.
    const argument0 = Blockly.KAREL.valueToCode(block, 'X', Blockly.KAREL.ORDER_NONE) || '0';
    const argument1 = Blockly.KAREL.valueToCode(block, 'Y', Blockly.KAREL.ORDER_NONE) || '0';
    return [
        'math.deg(math.atan2(' + argument1 + ', ' + argument0 + '))', Blockly.KAREL.ORDER_HIGH
    ];
};
