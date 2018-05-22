
function generateEquation() {
   var equationElement = document.getElementById('equation');
   //var equationConent = equationElement.innerHTML;

   var operands = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 

   var operand1 = operands[Math.floor(Math.random() * 10)];

   var operand2 = operands[Math.floor(Math.random() * 10)];
   var correctSum = operand1 + operand2;

   var deviation = [-1, 0, 1];
   var showingSum = correctSum + deviation[Math.floor(Math.random() * deviation.length)];

   var resultString = operand1.toString() + " + " + operand2.toString() + " = " + showingSum.toString();

   console.log(resultString);
   equationConent = resultString;
}

generateEquation();