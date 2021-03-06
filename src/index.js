import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {createStore,compose,applyMiddleware,combineReducers} from 'redux'
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import AuthReducer from "./Auth/Reducer/AuthReducer";
import ResourcesReducer from "./Reducer/ResourcesReducer";
import ProjectReducer from "./Reducer/ProjectReducer";
import ColumnReducer from "./Reducer/ColumnReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth:AuthReducer,
    res:ResourcesReducer,
    pro:ProjectReducer,
    col:ColumnReducer
});

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
