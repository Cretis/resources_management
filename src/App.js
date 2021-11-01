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
import Column from "./Component/Column";
import EditColumn from "./Component/EditColumn";


class App extends Component {

  render() {
    let routes = (
      <Switch>
          <Route path='/login' component={Login}/>
          <Route path="/register" component={Register}/>
          <Redirect to="/login"/>
      </Switch>
    )
      if(localStorage.getItem("token")!==null||this.props.loginSuccess){
          routes=(
          <Switch>
              <Route path='/resource' component={Resources}/>
              <Route path='/project' component={Project}/>
              <Route path='/column' component={Column}/>
              <Route path='/EditColumn' component={EditColumn}/>
              <Redirect to="/project"/>
          </Switch>
          )
      }

      let log = (<span style={{float:"right"}}>not logged</span>)
      if(localStorage.getItem('token')) {
          log = (<span/>)
      }
    return (
        <div className="all">
            <Menu/>
            <div>
            <div className="top"><Top/>{log}</div>
            {routes}
            </div>
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
