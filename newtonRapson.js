const Pi = Math.PI
let e = x => Math.E**(x)
let sin = x => Math.sin(x)
let cos = x => Math.cos(x)
let ln = x => Math.log(x)
// this is a test comment
let parseValue = num => Number(parseFloat(num).toPrecision(15))
// algorithm
let initialXValue = 0.5
let iterations = 15 

let checkValue = a => {
    if (a == Infinity || isNaN(a)) a = NaN
    if ((a + 1) == 1) a = 0
    return a
}
let functionOfX = x => {
    let fn = 
    // (1/2)*x*x*(sin(x) + 1)
    // cos(x) - x*x*x
    // e(-x) - ln(x)
    ln(x*x*x*x + 3*x*x - 1/x)
    return checkValue(fn)
}
let incremento = 0.1
let initialValue = () => {
    let initialSuggested = 5
    let functionValues = []
    for (let i = 0; i < 10; i = i + incremento){
        let eval = parseValue(i)
        let functionValue = checkValue(functionOfX(eval))
        functionValues.push(functionValue)
    }
    for (let i = 0; i < functionValues.length - 1; i++){
        // && !isNaN(functionValues[i]) &&  !isNaN(functionValues[i + 1])
        if ((functionValues[i] > 0 && functionValues[i + 1] < 0)){
            initialSuggested = i *incremento
            break
        }
        if ((functionValues[i] < 0 && functionValues[i + 1] > 0)){
            initialSuggested = (i + 1) * incremento
            break
        }
        if (isNaN(functionValues[i]) && functionValues[i + 1] < 0){
            console.log('suggested', (i + 1)* incremento)
            initialSuggested = (i + 1) * incremento
            break
        }
        // initialSuggested = parseValue(initialSuggested)
    }
    return initialSuggested
}

//
let posibleValues = () => {
    let pv = []
    for (let i = 0; i < 10; i = i + incremento){
        let functionValue = checkValue(functionOfX(i))
        if (isNaN(functionValue)) functionValue = 'SyntaxError :c'
        pv.push([i, functionValue])
    }
    return pv
}

let suggestedVal = posibleValues()
let sgvhtml = ''
for (let i = 0 ; i < suggestedVal.length; i++){
    sgvhtml = sgvhtml + `<tr> 
    <td>x = ${suggestedVal[i][0]}  ==>  ${suggestedVal[i][1]}</td>
    </tr>`
}
let valuesTable = document.querySelector('div.posible-values table')
valuesTable.outerHTML = '<table>' + sgvhtml + '</table>'

let divInitialValue = document.querySelector('div.initial-value')
divInitialValue.textContent = 'Initial Value Suggested = ' + parseValue(initialValue())

initialXValue = parseValue(initialValue())
let derivative = (x) => {
    let dx = 0.00000001
    return checkValue((functionOfX(x + dx)- functionOfX(x)) / (dx))
}
let newtonRapson = (initialXValue, functionOfX, derivative) => {
    let nr = (initialXValue) - (functionOfX / derivative)
    return checkValue(nr)
}

let headers = `<tr class="table-headers">
<td>Xn </td>
<td>F(Xn) </td>
<td>Xn+1</td>
</tr>`
let tableBody = document.querySelector('body .newton-table-container tbody')
let tableElements = ''
for (let i = 0; i < iterations; i++){
    let initial = initialXValue
    let nextValue = newtonRapson(initial, functionOfX(initial), derivative(initial))
    let f = functionOfX(initial)
    tableElements = tableElements + `<tr>
    <td>${initial} </td>
    <td>${f} </td>
    <td>${nextValue} </td>
    </tr>
    `
    initialXValue = nextValue
}

let tableContent = '<tbody>' + headers +  tableElements + '</tbody>'
tableBody.outerHTML = tableContent


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//initial values for areas
let a = 1
let b = 4
let n = 30

// TRAPEZOID METHOD
let funct = x => {
    // define the function
    let fn = 
    // x
    functionOfX(x)
    return checkValue(fn)
}
let deltaX = parseValue((b - a)/n)
let sumOfYs = 0
let sumIniFinal = 0
let ini = a
for (let i = a; i <= b; i = i + deltaX){
    i = parseValue(i)
    if ((i != a) && (i != b)){
        sumOfYs = parseValue(sumOfYs) + parseValue(2*funct(i))
    } else {
        sumIniFinal = parseValue(sumIniFinal) + parseValue(funct(i))
    }
}
let trapezoidArea = parseValue((parseValue(deltaX/2))*(parseValue(sumIniFinal) + parseValue(sumOfYs)))
if (trapezoidArea < 0) trapezoidArea = -1 * trapezoidArea
let trapezoidResult = document.querySelector('.trapecio-table-container thead + tbody')
trapezoidResult.textContent = `The approximation area is ${trapezoidArea} u^2`


// RIEMANN METHOD
let sum = 0
for (let i = parseValue(a + parseValue(deltaX/2)); i <= (parseValue(b - parseValue((deltaX/2)))); i = i + deltaX){
    i = parseValue(i)
    sum = parseValue(sum + parseValue(funct(i)))
}

let riemannArea = parseValue(deltaX * sum)
if (riemannArea < 0) riemannArea = -1 * riemannArea
let riemannResult = document.querySelector('.riemann-table-container thead + tbody')
riemannResult.textContent = `The approximation area is ${riemannArea} u^2`