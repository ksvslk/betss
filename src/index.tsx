import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './screens/HomePage';
import * as serviceWorker from './serviceWorker';
import { container } from 'inversify-props';
import 'reflect-metadata'; // Import only once
import { IMovieRepository } from './repository/IMovieRepository';
import MovieRepositoryImpl from './repository/movie-repository-impl';


ReactDOM.render(<HomePage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

container.addSingleton<IMovieRepository>(MovieRepositoryImpl, 'MovieRepository');