import { useState } from 'react';
import { Match } from '../types/Match';

/**
 * Interface for scoreboard functions.
 */
export interface ScoreboardFunctions {
  /**
   * Starts a new match.
   * @param homeTeam - The name of the home team.
   * @param awayTeam - The name of the away team.
   * @returns The ID of the new match.
   */
  startNewMatch: (homeTeam: string, awayTeam: string) => string;
  /**
   * Updates the score of a match.
   * @param homeScore - The new score of the home team.
   * @param awayScore - The new score of the away team.
   * @param id - The ID of the match to update.
   */
  updateScore: (homeScore: number, awayScore: number, id: string) => void;
  /**
   * Finishes a match.
   * @param id - The ID of the match to finish.
   */
  finishMatch: (id: string) => void;
  /**
   * Gets a summary of all matches.
   * @returns An array of Match objects.
   */
  getMatchesSummary: () => Match[];
}

/**
 * Custom hook that manages a scoreboard for matches.
 * @returns A tuple containing an array of matches and an object with functions to manage the scoreboard.
 */
export function useScoreboard(): [Match[], ScoreboardFunctions] {
  const [matches, setMatches] = useState<Match[]>([]);

  const startNewMatch = (homeTeam: string, awayTeam: string): string => {
    const newMatch: Match = {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      id: `${homeTeam} - ${awayTeam}`,
    };

    setMatches((prevState) => {
      const index = prevState.findIndex((match) => match.id === newMatch.id);
      if (index !== -1) return prevState;

      return [...prevState, newMatch];
    });

    return newMatch.id;
  };

  const updateScore = (homeScore: number, awayScore: number, id: string) => {
    setMatches((prevState) => {
      const updatedMatches = [...prevState];
      const index = updatedMatches.findIndex((match) => match.id === id);
      if (index === -1) return prevState;
      updatedMatches[index].homeScore = homeScore;
      updatedMatches[index].awayScore = awayScore;
      return updatedMatches;
    });
  };

  const finishMatch = (id: string) => {
    setMatches((prevState) => {
      const updatedMatches = [...prevState];
      const index = updatedMatches.findIndex((match) => match.id === id);
      if (index === -1) return prevState;
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

  return [
    matches,
    { startNewMatch, updateScore, finishMatch, getMatchesSummary },
  ];
}
