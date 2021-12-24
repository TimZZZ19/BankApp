import { useEffect, useState } from "react";

import "./Navbar.css";

const Navbar = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO Can add more input format check here.
    if (username && password) {
      props.validateInputUser(username, password);
    }
  };

  const clearAndBlur = () => {
    setUsername("");
    setPassword("");

    // TODO Add blur to inputs
    // PROBLEM
    // the only way to blur an input is to use e.target.blur()
    // however, now I still don't know how to grab e when clear is called.
  };

  useEffect(() => {
    if (props.clearInputs) {
      clearAndBlur();
      props.setClearInputs(false);
    }
  });

  return (
    <nav>
      <p className="welcome">
        {props.welcome ? props.welcome : "Log in to get started"}
      </p>
      <img
        src={require("../images/logo.png").default}
        alt="Logo"
        className="logo"
      />
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="user"
          className="login__input login__input--user"
          onChange={handleUsername}
        />
        {/* TODO need to hide password here */}
        <input
          type="text"
          value={password}
          placeholder="PIN"
          maxLength="4"
          className="login__input login__input--pin"
          onChange={handlePassword}
        />
        <button className="login__btn">&rarr;</button>
      </form>
    </nav>
  );
};

export default Navbar;
