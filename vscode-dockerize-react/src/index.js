import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from 'react-router-dom';


import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './components/Navbar';
import Routes from './Routes';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(    <Router>
    <div className="App">
        <Navigation />
        <Routes />
    </div>
</Router>,
document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
