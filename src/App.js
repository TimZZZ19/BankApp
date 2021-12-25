import { useState, Fragment } from "react";

import "./App.css";
import Navbar from "./components/UI/Navbar";
import Balance from "./components/display/Balance";
import Movements from "./components/display/Movements";
import Summary from "./components/display/Summary";
import Transfer from "./components/UI/Transfer";
import Loan from "./components/UI/Loan";
import Close from "./components/UI/Close";
import Timer from "./components/display/Timer";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2021-11-10T07:42:02.383Z",
    "2021-11-13T09:15:04.904Z",
    "2021-11-16T10:17:24.185Z",
    "2021-11-17T14:11:59.604Z",
    "2021-11-18T17:01:17.194Z",
    "2021-11-29T23:36:17.929Z",
    "2021-11-30T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

function App() {
  const [currentMovs, setCurrentMovs] = useState([]);
  const [isAscending, setIsAscending] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [isByDate, setIsByDate] = useState(true);

  const [currentDates, setCurrentDates] = useState([]);
  const [currentLocale, setCurrentLocale] = useState("en-US");
  const [currentCurrency, setCurrentCurrency] = useState("USD");

  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPin, setCurrentPin] = useState("");
  const [currentInterestRate, setCurrentInterestRate] = useState(1.0);

  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [showMain, setShowMain] = useState(false);
  const [clearInputs, setClearInputs] = useState(false);
  const [sortMovs, setSortMovs] = useState(false);
  const [clearTransfer, setClearTransfer] = useState(false);
  const [receiverLabel, setReceiverLabel] = useState("");
  const [amountLabel, setAmountLabel] = useState("");
  const [rejectLoan, setRejectLoan] = useState(false);
  const [clearCloseInput, setClearCloseInput] = useState(false);

  const [userLabel, setUserLabel] = useState("");
  const [pinLabel, setPinLabel] = useState("");

  let [currentTime, setCurrentTime] = useState(0);

  /////////////////////////////////////////////////
  // Validation

  const validateInputUser = (inputUsername, inputPassword) => {
    const tempAccount = accounts.find((acc) => acc.username === inputUsername);

    if (tempAccount.pin === +inputPassword) {
      setClearInputs(true); //  Clear input fields
      setShowMain(true); //  show main interface

      //  set some current variables which will be used in many places
      setCurrentMovs([...tempAccount.movements]);
      setCurrentUsername(tempAccount.username);
      setCurrentPin(tempAccount.pin);
      setCurrentInterestRate(tempAccount.interestRate);
      setCurrentTime(5);

      const currentDateObjs = tempAccount.movementsDates.map(
        (date) => new Date(date)
      );
      setCurrentDates([...currentDateObjs]);

      setCurrentLocale(tempAccount.locale);
      setCurrentCurrency(tempAccount.currency);

      //  display welcome message
      setWelcomeMessage(`Welcome back, ${tempAccount.owner.split(" ")[0]}`);
      // setClearInputs(false); //  reset for next clearing inputs
    }
  };

  /////////////////////////////////////////////////
  // Sorting

  // When two arrays are matching each other element-wise (like a map),
  // after one is sorted, sort the other one accordingly.
  const sortByArray = (orginalMovs, sortedMovs, movDates) => {
    const posDiffs = [];
    const sortedDates = [];
    const sortedMovsCopy = sortedMovs.slice();

    let newPos, posDiff;

    for (let i = 0; i < orginalMovs.length; i++) {
      newPos = sortedMovsCopy.indexOf(orginalMovs[i]);
      sortedMovsCopy[newPos] = "*";
      posDiff = newPos - i;
      posDiffs.push(posDiff);
    }

    for (let i = 0; i < movDates.length; i++)
      sortedDates[i + posDiffs[i]] = movDates[i];

    return sortedDates;
  };

  const sortMovsAndDates = () => {
    let sortedMovs = [];
    let sortedDates = [];

    if (isAscending) {
      // Sort to descending
      sortedMovs = currentMovs.slice().sort((a, b) => a - b);
      sortedDates = sortByArray(currentMovs, sortedMovs, currentDates);

      setIsAscending(false);
      setIsDescending(true);
    }

    if (isDescending) {
      // Sort to by-date

      sortedDates = currentDates.slice().sort((a, b) => a - b);
      sortedMovs = sortByArray(currentDates, sortedDates, currentMovs);

      setIsDescending(false);
      setIsByDate(true);
    }

    if (isByDate) {
      // Sort to asending
      sortedMovs = currentMovs.slice().sort((a, b) => b - a);
      sortedDates = sortByArray(currentMovs, sortedMovs, currentDates);

      setIsByDate(false);
      setIsAscending(true);
    }

    setCurrentMovs([...sortedMovs]);
    setCurrentDates([...sortedDates]);
  };

  // Check if sort is requested.
  if (sortMovs) {
    sortMovsAndDates();
    setSortMovs(false);
  }

  /////////////////////////////////////////////////
  // Transfer

  const sortMovsAndDatesAfNewMov = () => {
    let sortedMovs = [];
    let sortedDates = [];

    if (isAscending) {
      // Sort to asending
      sortedMovs = currentMovs.slice().sort((a, b) => b - a);
      sortedDates = sortByArray(currentMovs, sortedMovs, currentDates);
    }

    if (isDescending) {
      // Sort to descending
      sortedMovs = currentMovs.slice().sort((a, b) => a - b);
      sortedDates = sortByArray(currentMovs, sortedMovs, currentDates);
    }

    if (isByDate) {
      // Sort to by-date
      sortedDates = currentDates.slice().sort((a, b) => a - b);
      sortedMovs = sortByArray(currentDates, sortedDates, currentMovs);
    }

    setCurrentMovs([...sortedMovs]);
    setCurrentDates([...sortedDates]);
  };

  const handleTransfer = (receiver, amount) => {
    const receiverObj = accounts.find((acc) => acc.username === receiver);
    const balance = currentMovs.reduce((a, b) => a + b);

    if (!receiverObj) {
      setReceiverLabel("Receiver does not exist");
      return;
    }

    if (amount > balance) {
      setAmountLabel("Amount exceeds balance");
      return;
    }

    // subtract the amount from current movs and dates
    setClearTransfer(true);
    currentMovs.push(-amount);
    currentDates.push(new Date());
    sortMovsAndDatesAfNewMov();

    // add the amount to receiver's movs and dates
    receiverObj.movements.push(amount);
    receiverObj.movementsDates.push(new Date());
  };

  /////////////////////////////////////////////////
  // Loan

  const handleLoan = (amount) => {
    if (currentMovs.some((mov) => mov >= amount * 0.1)) {
      currentMovs.push(amount);
      currentDates.push(new Date());
      sortMovsAndDatesAfNewMov();
    } else {
      setRejectLoan(true);
    }
  };

  /////////////////////////////////////////////////
  // Close
  const handleClose = (user, pin) => {
    if (user !== currentUsername) {
      setUserLabel("Usernames don't match");
      return;
    }

    if (pin !== currentPin) {
      setPinLabel("Pins don't match");
      return;
    }

    setClearCloseInput(true);
    setShowMain(false);
  };

  return (
    <Fragment>
      <Navbar
        validateInputUser={validateInputUser}
        welcome={welcomeMessage}
        clearInputs={clearInputs}
        setClearInputs={setClearInputs}
      ></Navbar>
      <main className={`app ${showMain ? "valid" : ""}`}>
        <Balance
          currentMovs={currentMovs}
          currentLocale={currentLocale}
          currentCurrency={currentCurrency}
        ></Balance>
        <Movements
          currentMovs={currentMovs}
          currentDates={currentDates}
          currentLocale={currentLocale}
          currentCurrency={currentCurrency}
        ></Movements>
        <Summary
          setSortMovs={setSortMovs}
          isAscending={isAscending}
          isDescending={isDescending}
          isByDate={isByDate}
          currentMovs={currentMovs}
          currentInterestRate={currentInterestRate}
          currentCurrency={currentCurrency}
        ></Summary>
        <Transfer
          handleTransfer={handleTransfer}
          clearTransfer={clearTransfer}
          setClearTransfer={setClearTransfer}
          receiverLabel={receiverLabel}
          setReceiverLabel={setReceiverLabel}
          amountLabel={amountLabel}
          setAmountLabel={setAmountLabel}
        ></Transfer>
        <Loan
          handleLoan={handleLoan}
          rejectLoan={rejectLoan}
          setRejectLoan={setRejectLoan}
        ></Loan>
        <Close
          handleClose={handleClose}
          clearCloseInput={clearCloseInput}
          setClearCloseInput={setClearCloseInput}
          userLabel={userLabel}
          setUserLabel={setUserLabel}
          pinLabel={pinLabel}
          setPinLabel={setPinLabel}
        ></Close>
      </main>
    </Fragment>
  );
}

export default App;
