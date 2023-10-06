import { CardType } from './CardType';
import { MatchEventBase } from './MatchEventBase';
import { MatchEventType } from './MatchEventType';

export interface Card extends MatchEventBase {
  type: MatchEventType.Card;
  cardType: CardType;
  date: Date;
}
