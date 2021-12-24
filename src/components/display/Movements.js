import "./Movements.css";
import MovRow from "./MovRow.js";

const Movements = (props) => {
  const movsAndDates = [];
  const keys = [];

  // Combine movements and dates
  for (let i = 0; i < props.currentMovs.length; i++) {
    movsAndDates[i] = [props.currentMovs[i], props.currentDates[i]];
  }

  // Generate unique keys
  const generateKey = () => Math.floor(Math.random() * 1000);
  for (let i = 0; i < props.currentMovs.length; i++) {
    let newKey = generateKey();
    while (keys.includes(newKey)) newKey = generateKey();
    keys.push(newKey);
  }

  return (
    <div className="movements">
      {movsAndDates.reverse().map((mov, idx) => (
        <MovRow
          key={keys[idx]}
          mov={mov}
          currentLocale={props.currentLocale}
          currentCurrency={props.currentCurrency}
        ></MovRow>
      ))}
    </div>
  );
};

export default Movements;
