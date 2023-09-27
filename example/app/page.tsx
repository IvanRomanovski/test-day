'use client';

import React from 'react';
import { useEffect } from 'react';
import { Scoreboard, useScoreboard } from 'scoreboard';

export default function Home() {
  const [matches, { startNewMatch, updateScore, finishMatch }] =
    useScoreboard();

  useEffect(() => {
    const id1 = startNewMatch('Mexico', 'Canada');
    const id2 = startNewMatch('Spain', 'Brazil');
    const id3 = startNewMatch('Germany', 'France');
    const id4 = startNewMatch('Uruguay', 'Italy');
    const id5 = startNewMatch('Argentina', 'Australia');
    const id6 = startNewMatch('England', 'Portugal');

    updateScore(0, 5, id1);
    updateScore(10, 2, id2);
    updateScore(2, 2, id3);
    updateScore(6, 6, id4);
    updateScore(3, 1, id5);

    finishMatch(id6);
  }, []);

  return (
    <main className='grid h-screen place-items-center'>
      <div className='text-2xl [&_li]:mb-2'>
        <h1 className='text-3xl font-semibold mb-4'>Scoreboard</h1>
        <Scoreboard matches={matches} />
      </div>
    </main>
  );
}
