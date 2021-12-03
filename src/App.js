import "./App.css";
import Navbar from "./components/UI/Navbar";
import Balance from "./components/display/Balance";
import Movements from "./components/display/Movements";
import Summary from "./components/display/Summary";
import Transfer from "./components/UI/Transfer";
import Loan from "./components/UI/Loan";
import Close from "./components/UI/Close";
import Timer from "./components/display/Timer";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <main className="app">
        <Balance></Balance>
        <Movements></Movements>
        <Summary></Summary>
        <Transfer></Transfer>
        <Loan></Loan>
        <Close></Close>
        <Timer></Timer>
      </main>
    </div>
  );
}

export default App;
