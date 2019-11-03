// JavaScript source code
function Order(operator) {
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
function PostOrder(expression) {
    var postFixStack = [];
    var opStack = [];
    var number = '';

    for (var i = 0; i < expression.length; i++) {
        var c = expression.charAt(i);
        if (!isNaN(parseInt(c)) || c == '.') {
            number += c;
        } else {
            if (number != '') {
                postFixStack.push(parseFloat(number));
                number = '';
            }

            if (c == ')') {
                while (opStack[opStack.length - 1] != '(') {
                    postFixStack.push(opStack.pop());
                }
                opStack.pop();
            } else {
                while (opStack.length && (Order(c) <= Order(opStack[opStack.length - 1])) && (opStack[opStack.length - 1] != '(')) {
                    postFixStack.push(opStack.pop());
                }
                opStack.push(c);
            }
        }
    }

    if (number != '') {
        postFixStack.push(number);
    }

    while (opStack.length) {
        postFixStack.push(opStack.pop());
    }

    return postFixStack;
}

function Calculate(operator, b, a) {
    switch (operator) {
        case "^":
            return Math.pow(a, b);
        case "*":
            return a * b;
        case "/":
            return a / b;
        case "+":
            return a + b
        case "-":
            return a- b;
    }
}

function Calculator(expression) {
    var answer = [];
    var postExpression = PostOrder(expression);

    for (var i = 0; i < postExpression.length; i++) {
        if (Order(postExpression[i])) {
            answer.push(Calculate(postExpression[i], answer.pop(), answer.pop()));
        } else {
            answer.push(postExpression[i]);
        }
    }
    return answer[0];
}
console.log(Calculator("7^2+10*(14+13)*11-13*13"));