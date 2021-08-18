import './CalculatorField.css';

function CalculatorField(props) {
  return (
    <div className="CalculatorField">
      <p className="field-text">{props.chainOfOperations}</p>
    </div>
  );
}

export default CalculatorField;
