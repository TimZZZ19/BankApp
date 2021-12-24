import "./Close.css";
import { useEffect, useState } from "react";

const Close = (props) => {
  const [user, setUser] = useState("");
  const [pin, setPin] = useState("");

  const [userLabel, setUserLabel] = useState("Confirm user");
  const [pinLabel, setPinLabel] = useState("Confirm PIN");

  const resetUserLabel = () => {
    setUserLabel("Confirm user");
  };

  const resetPinLabel = () => {
    setPinLabel("Confirm PIN");
  };

  const handleUser = (e) => {
    setUser(e.target.value);
  };

  const handlePin = (e) => {
    setPin(e.target.value);
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    // Initial checking
    if (!user) {
      setUserLabel("User can't be empty");
      return;
    }

    if (!pin) {
      setPinLabel("Pin can't be empty");
      return;
    }

    props.handleClose(user, +pin);
  };

  useEffect(() => {
    if (props.clearCloseInput) {
      setUser("");
      setPin("");
      props.setClearCloseInput(false);
    }
  });

  useEffect(() => {
    if (props.userLabel.length > 0) {
      setUserLabel(props.userLabel);
      props.setUserLabel("");
    }
  });

  useEffect(() => {
    if (props.pinLabel.length > 0) {
      setPinLabel(props.pinLabel);
      props.setPinLabel("");
    }
  });

  return (
    <div className="operation operation--close">
      <h2>Close account</h2>
      <form className="form form--close" onSubmit={handleSubmission}>
        <input
          type="text"
          className="form__input form__input--user"
          value={user}
          onChange={handleUser}
          onFocus={resetUserLabel}
        />
        <input
          type="password"
          maxLength="6"
          className="form__input form__input--pin"
          value={pin}
          onChange={handlePin}
          onFocus={resetPinLabel}
        />
        <button className="form__btn form__btn--close">&rarr;</button>
        <label className="form__label">{userLabel}</label>
        <label className="form__label">{pinLabel}</label>
      </form>
    </div>
  );
};

export default Close;
