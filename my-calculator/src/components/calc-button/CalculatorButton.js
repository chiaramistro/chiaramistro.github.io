import './CalculatorButton.css';

function CalculatorButton(props) {

  function onCalcButtonClick(number) {
    console.log('You clicked ', number)
    props.onCalcButtonClicked(number)
  }

  return (
    <div className="CalculatorButton">
      <button className="calc-button" onClick={() => onCalcButtonClick(props.number)}>
        <p className="calc-button-text">{props.number}</p>
        </button>
    </div>
  );
}

export default CalculatorButton;
