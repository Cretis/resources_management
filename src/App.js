import logo from './logo.svg';
import './App.css';
import React,{Component} from "react";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Welcome from"./Component/Welcome"


class App extends Component {

  render() {
    let routes = (
      <Switch>
          <Route path='/login' component={Login}/>
          <Route path="/register" component={Register}/>
          <Redirect to="/login"/>
      </Switch>
    )
      if(this.props.loginSuccess){
          routes=(
          <Switch>
              <Route path='/welcome' component={Welcome}/>
              <Redirect to="/welcome"/>
          </Switch>
          )
      }
    return (
        <div>
          {routes}
        </div>
    );
  }
}

const mapStateToProps = state=>{
    return{
        token:state.token,
        error:state.err,
        loginSuccess:state.loginSuccess
    }
}
export default withRouter(connect(mapStateToProps,null)(App));
