import { renderHook, act } from '@testing-library/react';
import { useScoreboard } from './useScoreboard';

describe('useScoreboard', () => {
  it('should start with an empty list of matches', () => {
    const { result } = renderHook(() => useScoreboard());
    expect(result.current.matches).toEqual([]);
  });

  it('should add a new match', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.startNewMatch('Home', 'Away');
    });

    expect(result.current.matches).toHaveLength(1);
    expect(result.current.matches[0]).toEqual({
      homeTeam: 'Home',
      awayTeam: 'Away',
      homeScore: 0,
      awayScore: 0,
      id: expect.any(String),
    });
  });

  it('should update the score of a match', () => {
    const { result } = renderHook(() => useScoreboard());

    const id = result.current.startNewMatch('Home', 'Away');
    act(() => {
      result.current.updateScore(2, 1, id);
    });

    expect(result.current.matches[0]).toEqual({
      homeTeam: 'Home',
      awayTeam: 'Away',
      homeScore: 2,
      awayScore: 1,
      id,
    });
  });

  it('should finish a match', () => {
    const { result } = renderHook(() => useScoreboard());

    const id = result.current.startNewMatch('Home', 'Away');
    act(() => {
      result.current.finishMatch(id);
    });

    expect(result.current.matches).toEqual([]);
  });

  it('should do nothing if invalid id provided', () => {
    const { result } = renderHook(() => useScoreboard());

    const id = result.current.startNewMatch('Home', 'Away');
    act(() => {
      result.current.updateScore(2, 1, 'random-id');
      result.current.finishMatch('random-id');
    });

    expect(result.current.matches[0]).toEqual({
      homeTeam: 'Home',
      awayTeam: 'Away',
      homeScore: 0,
      awayScore: 0,
      id,
    });
  });

  it('should return the matches summary sorted by total score', () => {
    const { result } = renderHook(() => useScoreboard());

    const id1 = result.current.startNewMatch('Home1', 'Away1');
    const id2 = result.current.startNewMatch('Home2', 'Away2');
    act(() => {
      result.current.updateScore(2, 0, id1);
      result.current.updateScore(1, 2, id2);
    });

    const summary = result.current.getMatchesSummary();
    expect(summary).toEqual([
      {
        homeTeam: 'Home2',
        awayTeam: 'Away2',
        homeScore: 1,
        awayScore: 2,
        id: id2,
      },
      {
        homeTeam: 'Home1',
        awayTeam: 'Away1',
        homeScore: 2,
        awayScore: 0,
        id: id1,
      },
    ]);
  });

  it('should return the matches summary sorted by time if same score', () => {
    const { result } = renderHook(() => useScoreboard());

    const id1 = result.current.startNewMatch('Home1', 'Away1');
    const id2 = result.current.startNewMatch('Home2', 'Away2');
    act(() => {
      result.current.updateScore(0, 0, id1);
      result.current.updateScore(0, 0, id2);
    });

    const summary = result.current.getMatchesSummary();
    expect(summary).toEqual([
      {
        homeTeam: 'Home2',
        awayTeam: 'Away2',
        homeScore: 0,
        awayScore: 0,
        id: id2,
      },
      {
        homeTeam: 'Home1',
        awayTeam: 'Away1',
        homeScore: 0,
        awayScore: 0,
        id: id1,
      },
    ]);
  });

  it('should return the matches summary as specified in example', () => {
    const { result } = renderHook(() => useScoreboard());

    const id1 = result.current.startNewMatch('Mexico', 'Canada');
    const id2 = result.current.startNewMatch('Spain', 'Brazil');
    const id3 = result.current.startNewMatch('Germany', 'France');
    const id4 = result.current.startNewMatch('Uruguay', 'Italy');
    const id5 = result.current.startNewMatch('Argentina', 'Australia');
    act(() => {
      result.current.updateScore(0, 5, id1);
      result.current.updateScore(10, 2, id2);
      result.current.updateScore(2, 2, id3);
      result.current.updateScore(6, 6, id4);
      result.current.updateScore(3, 1, id5);
    });

    const summary = result.current.getMatchesSummary();
    expect(summary).toEqual([
      {
        homeTeam: 'Uruguay',
        awayTeam: 'Italy',
        homeScore: 6,
        awayScore: 6,
        id: id4,
      },
      {
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        homeScore: 10,
        awayScore: 2,
        id: id2,
      },
      {
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
        homeScore: 0,
        awayScore: 5,
        id: id1,
      },
      {
        homeTeam: 'Argentina',
        awayTeam: 'Australia',
        homeScore: 3,
        awayScore: 1,
        id: id5,
      },
      {
        homeTeam: 'Germany',
        awayTeam: 'France',
        homeScore: 2,
        awayScore: 2,
        id: id3,
      },
    ]);
  });
});
