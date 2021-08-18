import "./Calculator.css";
import CalculatorButton from "../calc-button/CalculatorButton";
import CalculatorField from "../calc-field/CalculatorField";
import { useState } from "react";
import { create, all } from "mathjs";

const MATCH_LAST_NUMBER_REGEX = /(\/\*\+\-\.)?[0-9]+$/gm;

function Calculator() {
  const [chainOfOperations, setChainOfOperations] = useState("");
  const [numberToShow, setNumberToShow] = useState("");
  const [lastAddedOp, setLastAddedOp] = useState(false);

  function addOperationtoOpChain(num) {
    console.log("Calculator: you clicked ", num);
    if (!isValidConcatenation(num)) {
      return;
    }

    const newChainOfOperations = chainOfOperations + num;

    if (lastAddedOp) {
      setNumberToShow('' + num); //reset
      setLastAddedOp(false);
    } else {
      setNumberToShow(numberToShow + num)
    }

    setChainOfOperations(newChainOfOperations);
    console.log("newChainOfOperations ", newChainOfOperations);
  }

  function addOperatorToOpChain(op) {
    console.log("Calculator: you clicked ", op);
    if (!isValidConcatenation(op)) {
      return;
    }

    const newChainOfOperations = chainOfOperations + op;
    setLastAddedOp(true);
    //keep displaying old num
    setChainOfOperations(newChainOfOperations);
  }

  function isValidConcatenation(character) {
    if (
      typeof character != "number" &&
      (isSign(chainOfOperations.slice(-1)) ||
        isEmpty(chainOfOperations.slice(-1)))
    ) {
      console.log("Concatenation is not valid");
      return false;
    }
    console.log("Concatenation is valid");
    return true;
  }

  function isSign(val) {
    return val === "+" || val === "-" || val === "*" || val === "/" || val === ".";
  }

  function isEmpty(val) {
    return val === "";
  }

  function resetChainOfOperations() {
    setNumberToShow('');
    setChainOfOperations("");
  }

  function onPosNegClicked() {
    let numToConcatenate = numberToShow;
    if (parseInt(numToConcatenate) > 0) {
      setNumberToShow('-' + numToConcatenate)
    } else {
      numToConcatenate = numToConcatenate.slice(1)
      setNumberToShow(numToConcatenate)
    }
    let updatedChainOfOp = chainOfOperations;
    updatedChainOfOp = updatedChainOfOp.replace(MATCH_LAST_NUMBER_REGEX, "-" + numToConcatenate);
    setChainOfOperations(updatedChainOfOp);
  }

  // function removeLastItemFromOpChain() {
  //   let updatedChainOfOp = chainOfOperations;
  //   //setChainOfOperations(updatedChainOfOp.slice(0, -1));
  //   updatedChainOfOp = updatedChainOfOp.replace(MATCH_LAST_NUMBER_REGEX, "");

  //   console.log('updatedChainOfOp with regex ', updatedChainOfOp)
  //   // if (isSign(updatedChainOfOp.slice(-1))) { //to remove also the sign left in the end
  //   //   console.log('updatedChainOfOp has a sign at the end')
  //   //   updatedChainOfOp = updatedChainOfOp.slice(0, -1)
  //   // }
  //   setChainOfOperations(updatedChainOfOp);
  // }

  function evaluateOpChain() {
    if (chainOfOperations === "" || isSign(chainOfOperations.slice(-1))) {
      return;
    }
    const math = create(all);
    const resolvedChainOfOp = "" + math.evaluate(chainOfOperations);
    setNumberToShow(resolvedChainOfOp);
    setChainOfOperations(resolvedChainOfOp);
  }

  return (
    <div className="Calculator">
      <p className="calc-title"> Calculator </p>
      <CalculatorField chainOfOperations={numberToShow} />
      <div className="calc-row">
        <CalculatorButton
          number={"C"}
          onCalcButtonClicked={() => resetChainOfOperations()}
        />
        <CalculatorButton
          onCalcButtonClicked={() => console.log("No action")}
        />
        {/* <CalculatorButton
          number={"<"}
          onCalcButtonClicked={() => removeLastItemFromOpChain()}
        /> */}
        <CalculatorButton
          number={"+-"}
          onCalcButtonClicked={(num) => onPosNegClicked(num)}
        />
        <CalculatorButton
          number={"/"}
          onCalcButtonClicked={(num) => addOperatorToOpChain(num)}
        />
      </div>
      <div className="calc-row">
        <CalculatorButton
          number={7}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={8}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={9}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={"*"}
          onCalcButtonClicked={(num) => addOperatorToOpChain(num)}
        />
      </div>
      <div className="calc-row">
        <CalculatorButton
          number={4}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={5}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={6}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={"-"}
          onCalcButtonClicked={(num) => addOperatorToOpChain(num)}
        />
      </div>
      <div className="calc-row">
        <CalculatorButton
          number={1}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={2}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={3}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={"+"}
          onCalcButtonClicked={(num) => addOperatorToOpChain(num)}
        />
      </div>
      <div className="calc-row">
        <CalculatorButton
          onCalcButtonClicked={() => console.log("No action")}
        />
        <CalculatorButton
          number={0}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={"."}
          onCalcButtonClicked={(num) => addOperationtoOpChain(num)}
        />
        <CalculatorButton
          number={"="}
          onCalcButtonClicked={() => evaluateOpChain()}
        />
      </div>
    </div>
  );
}

export default Calculator;
