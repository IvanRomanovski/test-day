'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { Scoreboard, useScoreboard } from 'scoreboard';

export default function Home() {
  const [matches, { startNewMatch, updateScore, getMatchesSummary }] =
    useScoreboard();
  const [sortedMatches, setSortedMatches] = useState(getMatchesSummary());

  useEffect(() => {
    const id1 = startNewMatch('Mexico', 'Canada');
    const id2 = startNewMatch('Spain', 'Brazil');
    const id3 = startNewMatch('Germany', 'France');
    const id4 = startNewMatch('Uruguay', 'Italy');
    const id5 = startNewMatch('Argentina', 'Australia');

    updateScore(0, 5, id1);
    updateScore(10, 2, id2);
    updateScore(2, 2, id3);
    updateScore(6, 6, id4);
    updateScore(3, 1, id5);
  }, []);

  useEffect(() => {
    setSortedMatches(getMatchesSummary());
  }, [matches]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left'>
        <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
          <h2 className={`mb-3 text-2xl font-semibold`}>Scoreboard</h2>
          <div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            <Scoreboard matches={matches} />
          </div>
        </div>
        <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
          <h2 className={`mb-3 text-2xl font-semibold`}>Summary</h2>
          <div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            <Scoreboard matches={sortedMatches} />
          </div>
        </div>
      </div>
    </main>
  );
}
