import React from 'react';
import { Score } from './Score';
import { Match } from '../types/Match';

export interface ScoreboardProps {
  matches: Match[];
}

/**
 * Renders a scoreboard component that displays a list of matches.
 * @param {Object} props - The component props.
 * @param {Array} props.matches - An array of match objects to display.
 * @returns {JSX.Element} - The rendered scoreboard component.
 */
export function Scoreboard({ matches }: ScoreboardProps) {
  return (
    <ol>
      {matches.map((match, index) => (
        <Score key={index} match={match} />
      ))}
    </ol>
  );
}
