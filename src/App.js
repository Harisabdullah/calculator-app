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

    //   for example: 2+3 , infixArray = [2, '+', 3]
    //   for example: 3*4 , infixArray = [3, '*', 4]

      let numbers = [];
      let operator;
      for (let i = 0; i < infixArray.length; i++) {
        if (!isNaN(parseInt(infixArray[i]))){
          numbers.push(parseInt(infixArray[i]));
        } else {
          operator = infixArray[i];
        }
      }
      const num1 = numbers[0];
      const num2 = numbers[1];

      if (num1 === undefined || num2 === undefined) {
        return;
      }

      switch (operator) {
        case '+':
          setValue((num1 + num2).toString());
          break;
        case '-':
          setValue((num1 - num2).toString());
          break;
        case 'X':
          setValue((num1 * num2).toString());
          break;
        case '/':
          setValue((num1 / num2).toString());
          break;
        default:
          setValue('Error');
          break;
      }

    } catch (e) {
      setValue('Error');
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
                        if (btn === "=") {
                          if(value && parseInt(value) !== 0) {
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
