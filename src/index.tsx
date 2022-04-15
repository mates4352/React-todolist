import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./store/store";

const renderUi = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={store.getState()} dispatch={store.dispatch.bind(store)}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
  reportWebVitals();
}

renderUi()
store.subscribe(renderUi)


