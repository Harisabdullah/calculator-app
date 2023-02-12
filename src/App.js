import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import {useState} from "react";


function convertToInfixArray(expression) {
  const result = [];
  let currentNum = '';
  for (const char of expression) {
    if (!isNaN(char) || char === '.') {
      currentNum += char;
    } else {
      if (currentNum) {
        result.push(currentNum);
        currentNum = '';
      }
      result.push(char);
    }
  }
  if (currentNum) {
    result.push(currentNum);
  }
  return result;
}

const getSeperatedEl = (expression) => {
  let numbers = [];
  let operator;

  for (let i = 0; i < expression.length; i++) {
    if (!isNaN(parseInt(expression[i]))){
      numbers.push(parseInt(expression[i]));
    } else {
      operator = expression[i];
    }
  }
  return [numbers, operator];
}



let clearScreenOnNextInput = false;
const App = () => {
  const [value, setValue] = useState("");
  const btnValues = [
    [7, 8, 9, "X"],
    [4, 5, 6, "/"],
    [1, 2, 3, "-"],
    [0, ".", "C", "+"],
    ["="]
  ];




  const handleEqual = () => {
    try {
      const infixArray = convertToInfixArray(value);


      const [numbers, operator] = getSeperatedEl(infixArray);
      const num1 = numbers[0];
      const num2 = numbers[1];


      if (num1 === undefined || num2 === undefined) {
        return;
      }

      let result;
      switch (operator) {
        case '+':
          result = (num1 + num2).toString();
          break;
        case '-':
          result = (num1 - num2).toString();
          break;
        case 'X':
          result = (num1 * num2).toString();
          break;
        case '/':
          if(num2 === 0) {
            result = "Division By Zero not allowed";
            clearScreenOnNextInput = true;
          } else {
            result = (num1 / num2).toString();
          }
          break;
        default:
          clearScreenOnNextInput = true;
          result ='Operator not supported';
          break;
      }
      setValue(result);
    } catch (e) {
      setValue('Error');
      clearScreenOnNextInput = true;
    }
  }

  return (
      <Wrapper>
        <Screen value={value} />
        <ButtonBox>
          {
            btnValues.flat().map((btn, i) => {
              return (
                  <Button
                      key={i}
                      className={btn === "=" ? "equals" : ""}
                      value={btn}
                      onClick={() => {
                        if(clearScreenOnNextInput) {
                          clearScreenOnNextInput = false;
                        }
                        if (btn === "=") {
                          if(value) {
                            handleEqual();
                          }
                        } else if (btn === "C"){
                          setValue("");
                        } else  {
                          setValue(value + btn);
                        }
                      }}
                  />
              );
            })
          }
        </ButtonBox>
      </Wrapper>
  );
};

export default App;
