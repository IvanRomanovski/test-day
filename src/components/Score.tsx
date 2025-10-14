import React from 'react';
import { Match } from '../types/Match';

export interface ScoreProps {
  match: Match;
}

/**
 * Renders a single score for a match.
 * @param {ScoreProps} match - The match object containing the home team, away team, home score, and away score.
 * @returns {JSX.Element} - The rendered score as a list item.
 */
export function Score({ match }: ScoreProps) {
  const { homeTeam, awayTeam, homeScore, awayScore } = match;
  return <li>{`${homeTeam} ${homeScore} - ${awayTeam} ${awayScore}`}</li>;
}
