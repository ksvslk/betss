import React from 'react';
import { render } from '@testing-library/react';
import DetailPage from '../screens/DetailPage';

test('renders search page text', () => {
    const { getByText } = render(<DetailPage />);
    const text = getByText('Details!');
    expect(text).toBeInTheDocument();
});