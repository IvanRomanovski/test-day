import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Score } from './Score';
import { Match } from '../types/Match';

describe('Score component', () => {
  const match: Match = {
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: 2,
    awayScore: 1,
    id: 'Real Madrid - Barcelona',
    date: new Date(),
  };

  it('renders the correct score', () => {
    const { getByText } = render(<Score match={match} />);
    expect(getByText('Real Madrid 2 - Barcelona 1')).toBeInTheDocument();
  });
});
