import './App.css';
import CurrentSeasonDrivers from './components/SeasonDrivers';
import { BrowserRouter as Router, Switch,Route,Redirect } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Constructors from './components/SeasonConstructors';
import { Provider } from "react-redux";
import {ConfigureStore} from './redux/ConfigureStore';
import SeasonDriverStandings from './components/SeasonDriverStandings';
import SeasonConstructorStandings from './components/SeasonConstructorStandings';

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
          <Route exact path="/drivers-standings" component={SeasonDriverStandings}/>
          <Route exact path="/constructors-standings" component={SeasonConstructorStandings}/>
          <Redirect to="/home" />
        </Switch>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
