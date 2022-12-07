import "./App.css";
import Tabmenu from "./components/Tabmenu";

function App() {
  return (
    <div className="App">
      <header
        style={{ margin: "auto", background: "gray", textAlign: "center" }}
      >
        <h1>PT ÄPPI</h1>
      </header>
      <Tabmenu />
    </div>
  );
}

export default App;
