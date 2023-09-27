import { useState } from 'react';
import { Match } from '../types/Match';

export function useScoreboard() {
  const [matches, setMatches] = useState<Match[]>([]);

  const startNewMatch = (homeTeam: string, awayTeam: string): string => {
    const newMatch: Match = {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      id: Math.random().toString(16).slice(2),
    };

    setMatches((prevState) => [...prevState, newMatch]);
    return newMatch.id;
  };

  const updateScore = (homeScore: number, awayScore: number, id: string) => {
    setMatches((prevState) => {
      const updatedMatches = [...prevState];
      const index = updatedMatches.findIndex((match) => match.id === id);
      updatedMatches[index].homeScore = homeScore;
      updatedMatches[index].awayScore = awayScore;
      return updatedMatches;
    });
  };

  const finishMatch = (id: string) => {
    setMatches((prevState) => {
      const updatedMatches = [...prevState];
      const index = updatedMatches.findIndex((match) => match.id === id);
      updatedMatches.splice(index, 1);
      return updatedMatches;
    });
  };

  const getMatchesSummary = (): Match[] => {
    const matchesSummary = matches.map((value, index) => ({
      index,
      match: value,
      totalScore: value.homeScore + value.awayScore,
    }));

    matchesSummary.sort((a, b) => {
      if (a.totalScore === b.totalScore) {
        return b.index - a.index;
      }
      return b.totalScore - a.totalScore;
    });

    return matchesSummary.map((value) => value.match);
  };

  return {
    matches,
    startNewMatch,
    updateScore,
    finishMatch,
    getMatchesSummary,
  };
}
