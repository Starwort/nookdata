import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import {Loading} from './components';
import './i18n';
import './index.scss';
import {root} from './misc';


ReactDOM.render(
    <Suspense fallback={<Loading />}>
        <BrowserRouter basename={root}>
            <App />
        </BrowserRouter>
    </Suspense>,
    document.getElementById('root')
);
export {};
