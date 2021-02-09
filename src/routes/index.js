import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import TrelloBoard from "../components/TrelloBoard";
import Home from "../components/Home";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Main from '../components/Main';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/:boardID" component={TrelloBoard} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
