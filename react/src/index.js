import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';

import App from './App';
import Liste_msg from './Liste_msg';
import Liste_ami from './Liste_ami';
import MainPage from './MainPage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MainPage />, document.getElementById('root'));
//ReactDOM.render(<Liste_ami />, document.getElementById('ami'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
