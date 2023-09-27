import React from 'react';
import { screen, render } from '@testing-library/react';
import { Scoreboard } from './Scoreboard';
import { Match } from '../types/Match';

const matches: Match[] = [
  { homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 2, awayScore: 1 },
  { homeTeam: 'Team C', awayTeam: 'Team D', homeScore: 0, awayScore: 0 },
];

describe('Scoreboard', () => {
  it('renders a list of scores', () => {
    render(<Scoreboard matches={matches} />);

    const position1 = screen.getByText('Team A 2 : Team B 1');
    const position2 = screen.getByText('Team C 0 : Team D 0');

    expect(position1.compareDocumentPosition(position2)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
