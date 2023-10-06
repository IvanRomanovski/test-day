import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Score } from './Score';
import { Match } from '../types/Match';
import { MatchEventType } from '../types/MatchEventType';
import { CardType } from '../types/CardType';

describe('Score component', () => {
  it('renders the correct score when match just started', () => {
    const match: Match = {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: 0,
      awayScore: 0,
      id: 'Real Madrid - Barcelona',
      date: new Date(),
      events: [],
    };

    const { getByText } = render(<Score match={match} />);
    expect(getByText('Real Madrid - Barcelona: 0 - 0')).toBeInTheDocument();
  });

  it('renders the correct score when one goal scored', () => {
    const date = new Date();
    const match: Match = {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: 1,
      awayScore: 0,
      id: 'Real Madrid - Barcelona',
      date,
      events: [
        {
          type: MatchEventType.Goal,
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes() + 5
          ),
          player: {
            firstName: 'Robert',
            lastName: 'Lewandowski',
          },
        },
      ],
    };

    const { getByText } = render(<Score match={match} />);
    expect(
      getByText('Real Madrid - Barcelona: 1 - 0 GL 5" (R.L)')
    ).toBeInTheDocument();
  });

  it('renders the correct score when two goals scored', () => {
    const date = new Date();
    const match: Match = {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: 1,
      awayScore: 1,
      id: 'Real Madrid - Barcelona',
      date,
      events: [
        {
          type: MatchEventType.Goal,
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes() + 5
          ),
          player: {
            firstName: 'Robert',
            lastName: 'Lewandowski',
          },
        },
        {
          type: MatchEventType.Goal,
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes() + 20
          ),
          player: {
            firstName: 'Luka',
            lastName: 'Modrić',
          },
        },
      ],
    };

    const { getByText } = render(<Score match={match} />);
    expect(
      getByText('Real Madrid - Barcelona: 1 - 1 GL 5" (R.L) GL 20" (L.M)')
    ).toBeInTheDocument();
  });

  test.each(Object.values(CardType))(
    'renders the correct card when %s card issued',
    (cardType) => {
      const date = new Date();
      const match: Match = {
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        homeScore: 0,
        awayScore: 0,
        id: 'Real Madrid - Barcelona',
        date,
        events: [
          {
            type: MatchEventType.Card,
            date: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              date.getHours(),
              date.getMinutes() + 5
            ),
            player: {
              firstName: 'Robert',
              lastName: 'Lewandowski',
            },
            cardType,
          },
        ],
      };

      const { getByText } = render(<Score match={match} />);
      const expectedEventType = cardType === CardType.Red ? 'RD' : 'YL';
      expect(
        getByText(
          `Real Madrid - Barcelona: 0 - 0 ${expectedEventType} 5" (R.L)`
        )
      ).toBeInTheDocument();
    }
  );

  it('handles mix of goals and scores', () => {
    const date = new Date();
    const match: Match = {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: 1,
      awayScore: 0,
      id: 'Real Madrid - Barcelona',
      date,
      events: [
        {
          type: MatchEventType.Goal,
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes() + 5
          ),
          player: {
            firstName: 'Robert',
            lastName: 'Lewandowski',
          },
        },
        {
          type: MatchEventType.Card,
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes() + 20
          ),
          player: {
            firstName: 'Luka',
            lastName: 'Modrić',
          },
          cardType: CardType.Yellow,
        },
      ],
    };

    const { getByText } = render(<Score match={match} />);
    expect(
      getByText('Real Madrid - Barcelona: 1 - 0 GL 5" (R.L) YL 20" (L.M)')
    ).toBeInTheDocument();
  });
});
