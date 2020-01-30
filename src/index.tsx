import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { container } from 'inversify-props';
import 'reflect-metadata'; // Import only once
import { IMovieRepository } from './repository/IMovieRepository';
import MovieRepositoryImpl from './repository/movie-repository-impl';
import HomePage from './screens/HomePage';
import { HashRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import DetailPage from './screens/DetailPage';
import SearchPage from './screens/SearchPage';
import { Provider } from 'react-redux';
import store from './redux/store';

container.addSingleton<IMovieRepository>(MovieRepositoryImpl, 'MovieRepository');

ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
        <HomePage />
        <Switch>
            <Route path="/details" component={DetailPage} />
            <Route path="/search" component={SearchPage} />
            <Route exact path="/">
                <Redirect to="/search" />
            </Route>
        </Switch>
        
    </HashRouter>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
