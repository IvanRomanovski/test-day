import '@testing-library/jest-dom';
import React from 'react';
import { screen, render } from '@testing-library/react';
import { Scoreboard } from './Scoreboard';
import { Match } from '../types/Match';

const matches: Match[] = [
  {
    homeTeam: 'Team A',
    awayTeam: 'Team B',
    homeScore: 0,
    awayScore: 0,
    id: 'Team A - Team B',
    date: new Date(),
    goals: [],
  },
  {
    homeTeam: 'Team C',
    awayTeam: 'Team D',
    homeScore: 0,
    awayScore: 0,
    id: 'Team C - Team D',
    date: new Date(),
    goals: [],
  },
];

describe('Scoreboard', () => {
  it('renders a list of scores', () => {
    render(<Scoreboard matches={matches} />);

    const position1 = screen.getByText('Team A - Team B: 0 - 0');
    const position2 = screen.getByText('Team C - Team D: 0 - 0');

    expect(position1.compareDocumentPosition(position2)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
