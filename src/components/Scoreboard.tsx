import React from 'react';
import { Score } from './Score';
import { Match } from '../types/Match';

export interface ScoreboardProps {
  matches: Match[];
}

export function Scoreboard({ matches }: ScoreboardProps) {
  return (
    <ol>
      {matches.map((match, index) => (
        <Score key={index} match={match} />
      ))}
    </ol>
  );
}
