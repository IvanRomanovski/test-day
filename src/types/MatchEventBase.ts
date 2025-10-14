import { MatchEventType } from './MatchEventType';
import { Player } from './Player';

export interface MatchEventBase {
  type: MatchEventType;
  date: Date;
  player: Player;
}
