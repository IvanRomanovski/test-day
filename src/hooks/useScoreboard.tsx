import { useState } from 'react';
import { Match } from '../types/Match';
import { Player } from '../types/Player';

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
   * Updates the score of a match. Accepts only incremental score changes.
   * @param homeScore - The new score of the home team.
   * @param awayScore - The new score of the away team.
   * @param player - Player who scored the goal.
   * @param id - The ID of the match to update.
   */
  updateScore: (
    homeScore: number,
    awayScore: number,
    player: Player,
    id: string
  ) => void;
  /**
   * Finishes a match.
   * @param id - The ID of the match to finish.
   */
  finishMatch: (id: string) => void;
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
      date: new Date(),
      goals: [],
    };

    setMatches((prevState) => {
      const index = prevState.findIndex((match) => match.id === newMatch.id);
      if (index !== -1) return prevState;

      return [newMatch, ...prevState];
    });

    return newMatch.id;
  };

  const updateScore = (
    homeScore: number,
    awayScore: number,
    player: Player,
    id: string
  ) => {
    setMatches((prevState) => {
      const updatedMatches = [...prevState];
      const index = updatedMatches.findIndex((match) => match.id === id);
      if (index === -1) return prevState;

      const prevHomeScore = updatedMatches[index].homeScore;
      const prevAwayScore = updatedMatches[index].awayScore;

      if (homeScore - prevHomeScore + awayScore - prevAwayScore !== 1) {
        return prevState;
      }

      updatedMatches[index].goals.push({
        date: new Date(),
        player,
      });

      updatedMatches[index].homeScore = homeScore;
      updatedMatches[index].awayScore = awayScore;

      // Sort matches by total score and date
      const totalScore = (match: Match): number =>
        match.homeScore + match.awayScore;

      updatedMatches.sort((a, b) => {
        const totalScoreA = totalScore(a);
        const totalScoreB = totalScore(b);

        if (totalScoreA === totalScoreB) {
          return b.date.getTime() - a.date.getTime();
        }

        return totalScoreB - totalScoreA;
      });

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

  return [matches, { startNewMatch, updateScore, finishMatch }];
}
