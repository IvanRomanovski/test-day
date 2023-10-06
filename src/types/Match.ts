import { MatchEvent } from './MatchEvent';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: Date;
  events: MatchEvent[];
}
