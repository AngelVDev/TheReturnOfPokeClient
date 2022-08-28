import Creator from "./pages/Creator";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/details/:id" component={Details} />
          <Route exact path="/create" component={Creator} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
