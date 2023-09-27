import React from 'react';
import { Match } from '../types/Match';

export interface ScoreProps {
  match: Match;
}

export function Score({ match }: ScoreProps) {
  const { homeTeam, awayTeam, homeScore, awayScore } = match;
  return <li>{`${homeTeam} ${homeScore} : ${awayTeam} ${awayScore}`}</li>;
}
