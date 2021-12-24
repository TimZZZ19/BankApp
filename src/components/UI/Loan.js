import "./Loan.css";
import { useEffect, useState } from "react";

const Loan = (props) => {
  const [loan, setLoan] = useState("");
  const [loanLabel, setLoanLabel] = useState("Amount");
  const resetLoanLabelOnFocus = () => {
    setLoanLabel("Amount");
  };

  const handleLoan = (e) => {
    setLoan(e.target.value);
    setLoanLabel("Amount");
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    // Initial checks
    if (!loan) {
      setLoanLabel("Loan amount can't be empty");
      return;
    }

    if (loan < 0) {
      setLoanLabel("Loan amount can't be less than 0");
      return;
    }

    props.handleLoan(+loan);
    setLoan("");
  };

  useEffect(() => {
    if (props.rejectLoan) {
      setLoanLabel("Loan is rejected, try a different amount");
      props.setRejectLoan(false);
    }
  });

  return (
    <div className="operation operation--loan">
      <h2>Request loan</h2>
      <form className="form form--loan" onSubmit={handleSubmission}>
        <input
          value={loan}
          type="number"
          className="form__input form__input--loan-amount"
          onChange={handleLoan}
          onFocus={resetLoanLabelOnFocus}
        />
        <button className="form__btn form__btn--loan">&rarr;</button>
        <label className="form__label form__label--loan">{loanLabel}</label>
      </form>
    </div>
  );
};

export default Loan;
