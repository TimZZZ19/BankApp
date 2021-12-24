import "./Transfer.css";
import { useEffect, useState } from "react";

const Transfer = (props) => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const [receiverLabel, setReceiverLabel] = useState("Receiver");
  const resetReceiverLabelOnFocus = () => {
    setReceiverLabel("Receiver");
  };

  const [amountLabel, setAmountLabel] = useState("Amount");
  const resetAmountLabelOnFocus = () => {
    setAmountLabel("Amount");
  };

  const handleReceiver = (e) => {
    setReceiver(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    // Initial checks
    // TODO Here, we can make the warning fancier, like red font, shaking box, etc.
    if (!receiver) {
      setReceiverLabel("Receiver can't be empty");
      return;
    }
    if (amount < 0) {
      setAmountLabel("Amount can't be less than 0");
      return;
    }
    props.handleTransfer(receiver, +amount);
  };

  const clearAndBlur = () => {
    setReceiver("");
    setAmount("");

    // TODO Add blur to inputs
    // PROBLEM
    // the only way to blur an input is to use e.target.blur()
    // however, now I still don't know how to grab e when clear is called.
  };

  useEffect(() => {
    if (props.clearTransfer) {
      clearAndBlur();
      props.setClearTransfer(false);
    }
  });

  useEffect(() => {
    if (props.receiverLabel.length > 0) {
      setReceiverLabel(props.receiverLabel);
      props.setReceiverLabel("");
    }
  });

  useEffect(() => {
    if (props.amountLabel.length > 0) {
      setAmountLabel(props.amountLabel);
      props.setAmountLabel("");
    }
  });

  return (
    <div className="operation operation--transfer">
      <h2>Transfer money</h2>
      <form className="form form--transfer" onSubmit={handleSubmission}>
        <input
          type="text"
          className="form__input form__input--to"
          value={receiver}
          onChange={handleReceiver}
          onFocus={resetReceiverLabelOnFocus}
        />
        <input
          type="number"
          className="form__input form__input--amount"
          value={amount}
          onChange={handleAmount}
          onFocus={resetAmountLabelOnFocus}
        />
        <button className="form__btn form__btn--transfer">&rarr;</button>
        <label className="form__label">{receiverLabel}</label>
        <label className="form__label">{amountLabel}</label>
      </form>
    </div>
  );
};

export default Transfer;
