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


    RunCalculator() {
        var result = this.Calculator(this.state.text);

        if (result == null) {
            this.setState({ text: "Error", newEquation: true })
        } else {
            this.setState({ text: result, newEquation: false })
        }
    }
    _onPressButton(val) {
        if (this.state.newEquation) {
            this.setState({ text: val, newEquation: false });
        } else {
            this.setState({ text: this.state.text + val });
        }
    }

    clearText = () => {
        this.setState({ text: "" });
    }

    state = { text: "", newEquation: true }

    render() {
        return (
            <Grid style={{ margin: 30 }}>
                <Row>
                    <Text
                        style={{ height: 50, width: 200, marginHorizontal: 20, borderWidth: 1, borderColor: '#ccc' }}
                    >
                        {this.state.text}
                    </Text>
                </Row>
                <Row>
                    <Col>
                        <Button
                            title="("
                            onPress={() => this._onPressButton('(')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title=")"
                            onPress={() => this._onPressButton(')')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="^"
                            onPress={() => this._onPressButton('^')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="/"
                            onPress={() => this._onPressButton('/')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            title="7"
                            onPress={() => this._onPressButton('7')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="8"
                            onPress={() => this._onPressButton('8')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="9"
                            onPress={() => this._onPressButton('9')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="*"
                            onPress={() => this._onPressButton('*')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            title="4"
                            onPress={() => this._onPressButton('4')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="5"
                            onPress={() => this._onPressButton('5')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="6"
                            onPress={() => this._onPressButton('6')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="-"
                            onPress={() => this._onPressButton('-')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            title="1"
                            onPress={() => this._onPressButton('1')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="2"
                            onPress={() => this._onPressButton('2')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="3"
                            onPress={() => this._onPressButton('3')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="+"
                            onPress={() => this._onPressButton('+')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            title="0"
                            onPress={() => this._onPressButton('0')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="."
                            onPress={() => this._onPressButton('.')}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="C"
                            onPress={this.clearText}
                        />
                    </Col>
                    <Col>
                        <Button
                            title="="
                            onPress={() => this.RunCalculator()}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
