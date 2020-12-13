import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">Login</Route>
          <Route path="/logout">Logout</Route>
          <Route path="/header">Header</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
