import React from 'react';
import { render, act } from '@testing-library/react';
import SearchPage from '../screens/SearchPage';
import { Router } from 'react-router';
import HomePage from '../screens/HomePage';
import { createMemoryHistory } from "history";

test.skip('renders search page text', () => {
    const { getByText } = render(<SearchPage />);
    const text = getByText('Search!');
    expect(text).toBeInTheDocument();
});

test("redirects to search page in start", () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <HomePage />
        </Router>
    );
    expect(window.location.pathname).toBe("/search");
});