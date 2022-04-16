import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./store/store";
import {Context} from "./store/context";

const renderUi = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Context.Provider value={store}>
        <App/>
      </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
  reportWebVitals();
}

renderUi()
store.subscribe(renderUi)


