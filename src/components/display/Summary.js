import { useState } from "react";
import "./Summary.css";

const Summary = (props) => {
  let order = "ASCEND";
  if (props.isAscending) order = "DESCEND";
  if (props.isDescending) order = "BY DATE";

  const [income, setIncome] = useState("");
  const [outcome, setOutcome] = useState("");
  const [currInterest, setCurrInterest] = useState("");

  if (props.currentMovs.length > 0) {
    //  Calculate in and out and interest and format them

    const inTotal = props.currentMovs
      .filter((mov) => mov > 0)
      .reduce((acc, curr) => acc + curr, 0);
    const outTotal = props.currentMovs
      .filter((mov) => mov < 0)
      .reduce((acc, curr) => acc + curr, 0);
    const interest = props.currentMovs
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * props.currentInterestRate) / 100)
      .filter((int) => int >= 1)
      .reduce((acc, int) => acc + int, 0);

    const option = {
      style: "currency",
      currency: props.currentCurrency,
    };
    const newIncome = new Intl.NumberFormat(props.currentLocale, option).format(
      inTotal.toFixed(2)
    );
    const newOutcome = new Intl.NumberFormat(
      props.currentLocale,
      option
    ).format(outTotal.toFixed(2));
    const newInterest = new Intl.NumberFormat(
      props.currentLocale,
      option
    ).format(interest.toFixed(2));

    if (newIncome !== income) setIncome(newIncome);
    if (newOutcome !== outcome) setOutcome(newOutcome);
    if (newInterest !== currInterest) setCurrInterest(newInterest);
  }

  const setSortMovs = () => {
    props.setSortMovs(true);
  };

  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">{income}</p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">{outcome}</p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">{currInterest}</p>
      <button className="btn--sort" onClick={setSortMovs}>
        {order}
      </button>
    </div>
  );
};

export default Summary;
