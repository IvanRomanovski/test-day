import React from 'react';
import { Match } from '../types/Match';
import { MatchEventType } from '../types/MatchEventType';
import { CardType } from '../types/CardType';
import { MatchEvent } from '../types/MatchEvent';

export interface ScoreProps {
  match: Match;
}

/**
 * Renders a single score for a match.
 * @param {ScoreProps} match - The match object containing the home team, away team, home score, and away score.
 * @returns {JSX.Element} - The rendered score as a list item.
 */
export function Score({ match }: ScoreProps) {
  const { homeTeam, awayTeam, homeScore, awayScore, events, date } = match;
  const scores = events
    .map((event) => {
      const eventTime = Math.ceil(
        (event.date.getTime() - date.getTime()) / 1000 / 60
      );

      const playerInitials = `${event.player.firstName[0]}.${event.player.lastName[0]}`;

      const eventTypeFormatter = (event: MatchEvent) => {
        if (event.type === MatchEventType.Card) {
          return event.cardType === CardType.Yellow ? 'YL' : 'RD';
        } else if ((event.type = MatchEventType.Goal)) {
          return 'GL';
        } else {
          throw new Error('Invalid event type.');
        }
      };

      return `${eventTypeFormatter(event)} ${eventTime}" (${playerInitials})`;
    })
    .join(' ');

  return (
    <li>{`${homeTeam} - ${awayTeam}: ${homeScore} - ${awayScore} ${scores}`}</li>
  );
}
