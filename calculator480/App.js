import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class ButtonBasics extends Component {
    // JavaScript source code
    Order(operator) {
        switch (operator) {
            case "(":
            case ")":
                return 4;
            case "^":
                return 3;
            case "*":
            case "/":
                return 2;
            case "+":
            case "-":
                return 1;
            default:
                //is a number
                return 0;
        }
    }
    PostOrder(expression) {
        var postFixStack = [];
        var opStack = [];
        var number = '';
        var dec = false;
        var opUsed = '=';

        for (var i = 0; i < expression.length; i++) {
            var c = expression.charAt(i);
            if (!isNaN(parseInt(c))) {
                if (opUsed == ')') {
                    throw "no operation after parenthesy"
                }
                number += c;
                opUsed = '';
            } else if (c == '.') {
                if (dec) {
                    throw "already decimal";
                }
                number += c;
                dec = true;
                opUsed = '';
            } else if (number == '' && c == '-') {
                number += c;
                opUsed = '';
            } else {
                if (number != '') {
                    if (c == '(') {
                        throw "no operator before parenthesy"
                    }
                    postFixStack.push(parseFloat(number));
                    number = '';
                    dec = false;
                }
                if (c == ')') {
                    for (; opStack.length > 0 && opStack[opStack.length - 1] != '(';) {
                        postFixStack.push(opStack.pop());
                    }
                    if (opStack.length == 0) {
                        throw "no opening parenthesy";
                    }
                    opStack.pop();
                    opUsed = ')';
                } else {
                    while (opStack.length && (this.Order(c) <= this.Order(opStack[opStack.length - 1])) && (opStack[opStack.length - 1] != '(')) {
                        postFixStack.push(opStack.pop());
                    }
                    if (c != '(') {
                        if (opUsed != '' && opUsed != '(' && opUsed != ')') {
                            throw "too many operators";
                        }
                        opUsed = c;
                    }

                    opStack.push(c);
                }
            }
        }

        if (number != '') {
            postFixStack.push(parseFloat(number));
        }

        while (0 < opStack.length) {
            var operator = opStack.pop();
            if (operator == '(') {
                throw "no closing parenthesy"
            } else {
                postFixStack.push(operator);
            }
        }

        return postFixStack;
    }

    Calculate(operator, b, a) {
        switch (operator) {
            case "^":
                return Math.pow(a, b);
            case "*":
                return a * b;
            case "/":
                if (b == 0) {
                    throw "div by 0";
                }
                return a / b;
            case "+":
                return a + b
            case "-":
                return a - b;
        }
    }

    Calculator(expression) {
        var answer = [];
        var postExpression = [];

        try {
            postExpression = this.PostOrder(expression);
        } catch (e) {
            console.log(e);
            return;
        }

        for (var i = 0; i < postExpression.length; i++) {
            if (this.Order(postExpression[i])) {
                try {
                    var calculatedValue = this.Calculate(postExpression[i], answer.pop(), answer.pop());
                    if (calculatedValue == "-Infinity" || calculatedValue == "Infinity") {
                        throw "number too large or small"
                    }
                    answer.push(calculatedValue);
                } catch (e) {
                    //divide by 0
                    console.log(e);
                    return;
                }
            } else {
                answer.push(postExpression[i]);
            }
        }
        return answer[0];
    }

    render() {
        return ( );
}
}