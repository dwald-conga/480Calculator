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
                for (; opStack.length > 0 && opStack[opStack.length - 1] != '(';) {
                    postFixStack.push(opStack.pop());
                }
                if (opStack.length == 0) {
                    throw "no opening parenthesy";
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
        postFixStack.push(parseFloat(number));
    }

    while (0 < opStack.length) {
        var operator = opStack.pop();
        if (operator == '(') {
            throw "no closing parenthesy"
            return;
        } else {
            postFixStack.push(operator);
        }
    }

    return postFixStack;
}

function Calculate(operator, b, a) { 
    switch (operator) {
        case "^":
            return Math.pow(a, b);
        case "*":
            return a*b;
        case "/":
            if (b == 0) {
                throw "div by 0";
            }
            return a/b;
        case "+":
            return a+b
        case "-":
            return a-b;
    }
}

function Calculator(expression) {
    var answer = [];
    var postExpression = [];

    try {
        postExpression = PostOrder(expression);
        console.log(postExpression);
    } catch (e) {
        console.log(e);
        return;
    }
    
    for (var i = 0; i < postExpression.length; i++) {
        if (Order(postExpression[i])) {
            try {
                var calculatedValue = Calculate(postExpression[i], answer.pop(), answer.pop());
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
console.log(Calculator("(1+2*(3-4))/5"));