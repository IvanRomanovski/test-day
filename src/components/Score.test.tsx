import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Score } from './Score';
import { Match } from '../types/Match';

describe('Score component', () => {
  it('renders the correct score when match just started', () => {
    const match: Match = {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: 0,
      awayScore: 0,
      id: 'Real Madrid - Barcelona',
      date: new Date(),
      goals: [],
    };

    const { getByText } = render(<Score match={match} />);
    expect(getByText('Real Madrid - Barcelona: 0 - 0')).toBeInTheDocument();
  });

  it('renders the correct score when one goal scored', () => {
    const date = new Date();
    const match: Match = {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: 1,
      awayScore: 0,
      id: 'Real Madrid - Barcelona',
      date,
      goals: [
        {
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes() + 5
          ),
        },
      ],
    };

    const { getByText } = render(<Score match={match} />);
    expect(getByText('Real Madrid - Barcelona: 1 - 0 5"')).toBeInTheDocument();
  });

  it('renders the correct score when two goals scored', () => {
    const date = new Date();
    const match: Match = {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: 1,
      awayScore: 1,
      id: 'Real Madrid - Barcelona',
      date,
      goals: [
        {
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes() + 5
          ),
        },
        {
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes() + 20
          ),
        },
      ],
    };

    const { getByText } = render(<Score match={match} />);
    expect(
      getByText('Real Madrid - Barcelona: 1 - 1 5" 20"')
    ).toBeInTheDocument();
  });
});
