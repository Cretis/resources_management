import logo from './logo.svg';
import './App.css';
import React,{Component} from "react";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./Auth/Login";


class App extends Component {

  render() {
    let routes = (
      <Switch>
          <Route path='/login' component={Login}/>
          <Route path="/register" component={}/>
          <Redirect to="/login"/>
      </Switch>
    )
    return (
        <div>
          <h1>Login</h1>
          {routes}
        </div>
    );
  }
}
export default withRouter(connect(null,null)(App));
