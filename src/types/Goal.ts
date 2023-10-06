import { MatchEventBase } from './MatchEventBase';
import { MatchEventType } from './MatchEventType';

export interface Goal extends MatchEventBase {
  type: MatchEventType.Goal;
}
