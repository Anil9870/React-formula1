import './App.css';
import CurrentSeasonDrivers from './components/CurrentSeasonDrivers';
import { BrowserRouter as Router, Switch,Route,Redirect } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Constructors from './components/Constructors';
import { Provider } from "react-redux";
import {ConfigureStore} from './redux/ConfigureStore';

const store = ConfigureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Header/>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route exact path="/drivers" component={CurrentSeasonDrivers}/>
          <Route exact path="/constructors" component={Constructors}/>
          <Redirect to="/home" />
        </Switch>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
