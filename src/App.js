import './App.css';
import React, {Component, Fragment} from "react";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Resources from "./Component/Resources";
import Project from "./Component/Project";
import Top from "./Component/Top";
import Menu from "./Component/Menu";


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
              <Route path='/resource' component={Resources}/>
              <Route path='/project' component={Project}/>
              <Redirect to="/resource"/>
          </Switch>
          )
      }

      let log = (<span>not logged</span>)
      if(this.props.loginSuccess) {
          log = (<span/>)
      }
    return (
        <div>
            <Menu/><Fragment>
            <div><Top/>{log}</div>
            {routes}
        </Fragment>

        </div>
    );
  }
}

const mapStateToProps = state=>{
    return{
        token:state.auth.token,
        error:state.auth.err,
        loginSuccess:state.auth.loginSuccess,
    }
}
export default withRouter(connect(mapStateToProps,null)(App));
