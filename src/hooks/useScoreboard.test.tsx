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
});
