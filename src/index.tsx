import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {reduxStore} from "./bll/redux-store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
       <BrowserRouter>
          <Provider store={reduxStore}>
             <App/>
          </Provider>
       </BrowserRouter>
    </React.StrictMode>,

    document.getElementById('root')
);
reportWebVitals();



