import { renderHook, act } from '@testing-library/react';
import { useScoreboard } from './useScoreboard';

describe('useScoreboard', () => {
  it('should start with an empty list of matches', () => {
    const { result } = renderHook(() => useScoreboard());
    expect(result.current[0]).toEqual([]);
  });

  it('should add a new match', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current[1].startNewMatch('Home', 'Away');
    });

    expect(result.current[0]).toHaveLength(1);
    expect(result.current[0]).toEqual([
      {
        homeTeam: 'Home',
        awayTeam: 'Away',
        homeScore: 0,
        awayScore: 0,
        id: expect.any(String),
        date: expect.any(Date),
        goals: [],
      },
    ]);
  });

  it('should prevent addition of duplicate matches', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current[1].startNewMatch('Home', 'Away');
      result.current[1].startNewMatch('Home', 'Away');
    });

    expect(result.current[0]).toHaveLength(1);
  });

  it('should update the score of a match', () => {
    const { result } = renderHook(() => useScoreboard());

    let id = '';
    act(() => {
      id = result.current[1].startNewMatch('Home', 'Away');
      result.current[1].updateScore(0, 1, id);
    });

    expect(result.current[0]).toEqual([
      {
        homeTeam: 'Home',
        awayTeam: 'Away',
        homeScore: 0,
        awayScore: 1,
        id: expect.any(String),
        date: expect.any(Date),
        goals: [
          {
            date: expect.any(Date),
          },
        ],
      },
    ]);
  });

  it('should finish a match', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      const id = result.current[1].startNewMatch('Home', 'Away');
      result.current[1].finishMatch(id);
    });

    expect(result.current[0]).toEqual([]);
  });

  it('should do nothing if invalid id provided', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current[1].startNewMatch('Home', 'Away');
      result.current[1].updateScore(2, 1, 'random-id');
      result.current[1].finishMatch('random-id');
    });

    expect(result.current[0]).toEqual([
      {
        homeTeam: 'Home',
        awayTeam: 'Away',
        homeScore: 0,
        awayScore: 0,
        id: expect.any(String),
        date: expect.any(Date),
        goals: [],
      },
    ]);
  });

  it('should return the matches summary sorted by total score', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      const id1 = result.current[1].startNewMatch('Home1', 'Away1');
      const id2 = result.current[1].startNewMatch('Home2', 'Away2');
      result.current[1].updateScore(1, 0, id1);
      result.current[1].updateScore(0, 1, id2);
      result.current[1].updateScore(1, 1, id2);
    });

    expect(result.current[0]).toEqual([
      {
        homeTeam: 'Home2',
        awayTeam: 'Away2',
        homeScore: 1,
        awayScore: 1,
        id: expect.any(String),
        date: expect.any(Date),
        goals: expect.any(Array),
      },
      {
        homeTeam: 'Home1',
        awayTeam: 'Away1',
        homeScore: 1,
        awayScore: 0,
        id: expect.any(String),
        date: expect.any(Date),
        goals: expect.any(Array),
      },
    ]);
  });

  it('should return the matches summary sorted by time if same score', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2023, 1, 1));
      result.current[1].startNewMatch('Home1', 'Away1');
      jest.setSystemTime(new Date(2024, 1, 1));
      result.current[1].startNewMatch('Home2', 'Away2');
      jest.useRealTimers();
    });

    expect(result.current[0]).toEqual([
      {
        homeTeam: 'Home2',
        awayTeam: 'Away2',
        homeScore: 0,
        awayScore: 0,
        id: expect.any(String),
        date: expect.any(Date),
        goals: expect.any(Array),
      },
      {
        homeTeam: 'Home1',
        awayTeam: 'Away1',
        homeScore: 0,
        awayScore: 0,
        id: expect.any(String),
        date: expect.any(Date),
        goals: expect.any(Array),
      },
    ]);
  });

  it('should return the matches summary as specified in example', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2023, 1, 1));
      const id1 = result.current[1].startNewMatch('Mexico', 'Canada');
      jest.setSystemTime(new Date(2024, 1, 1));
      const id2 = result.current[1].startNewMatch('Spain', 'Brazil');
      jest.setSystemTime(new Date(2025, 1, 1));
      const id3 = result.current[1].startNewMatch('Germany', 'France');
      jest.setSystemTime(new Date(2026, 1, 1));
      const id4 = result.current[1].startNewMatch('Uruguay', 'Italy');
      jest.setSystemTime(new Date(2027, 1, 1));
      const id5 = result.current[1].startNewMatch('Argentina', 'Australia');
      jest.useRealTimers();

      const setScore = (homeScore: number, awayScore: number, id: string) => {
        for (let i = 1; i <= homeScore; i++) {
          result.current[1].updateScore(i, 0, id);
        }

        for (let i = 1; i <= awayScore; i++) {
          result.current[1].updateScore(homeScore, i, id);
        }
      };

      setScore(0, 5, id1);
      setScore(10, 2, id2);
      setScore(2, 2, id3);
      setScore(6, 6, id4);
      setScore(3, 1, id5);
    });

    expect(result.current[0]).toEqual([
      {
        homeTeam: 'Uruguay',
        awayTeam: 'Italy',
        homeScore: 6,
        awayScore: 6,
        id: expect.any(String),
        date: expect.any(Date),
        goals: expect.any(Array),
      },
      {
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        homeScore: 10,
        awayScore: 2,
        id: expect.any(String),
        date: expect.any(Date),
        goals: expect.any(Array),
      },
      {
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
        homeScore: 0,
        awayScore: 5,
        id: expect.any(String),
        date: expect.any(Date),
        goals: expect.any(Array),
      },
      {
        homeTeam: 'Argentina',
        awayTeam: 'Australia',
        homeScore: 3,
        awayScore: 1,
        id: expect.any(String),
        date: expect.any(Date),
        goals: expect.any(Array),
      },
      {
        homeTeam: 'Germany',
        awayTeam: 'France',
        homeScore: 2,
        awayScore: 2,
        id: expect.any(String),
        date: expect.any(Date),
        goals: expect.any(Array),
      },
    ]);
  });
});
