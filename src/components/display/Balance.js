import "./Balance.css";
import { useState } from "react";

const Balance = (props) => {
  const [currBalance, setCurrBalance] = useState();

  if (props.currentMovs.length > 0) {
    const balance = props.currentMovs.reduce((acc, curr) => acc + curr);

    //  Calculate balance and format it
    const option = {
      style: "currency",
      currency: props.currentCurrency,
    };
    const newBalance = new Intl.NumberFormat(
      props.currentLocale,
      option
    ).format(balance.toFixed(2));

    if (newBalance !== currBalance) setCurrBalance(newBalance);
  }

  //  Formatting today's date
  const option = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  const now = new Intl.DateTimeFormat(props.currentLocale, option).format(
    new Date()
  );

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">{now}</span>
        </p>
      </div>
      <p className="balance__value">{currBalance}</p>
    </div>
  );
};

export default Balance;
