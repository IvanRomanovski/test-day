# Live Football World Cup Score Board

Scoreboard is a library that shows all ongoing matches and their scores.

## Usage

```ts
import React from 'react';
import { useEffect, useState } from 'react';
import { Scoreboard, useScoreboard } from 'scoreboard';

export default function Home() {
  const [matches, { startNewMatch, updateScore, getMatchesSummary }] =
    useScoreboard();
  const [sortedMatches, setSortedMatches] = useState(getMatchesSummary());

  useEffect(() => {
    // Start new matches assuming initial score 0 – 0
    const id1 = startNewMatch('Mexico', 'Canada');
    const id2 = startNewMatch('Spain', 'Brazil');
    const id3 = startNewMatch('Germany', 'France');

    // Update scores with home and away team scores
    updateScore(0, 5, id1);
    updateScore(10, 2, id2);
    updateScore(2, 2, id3);
  }, []);

  // On change in scoreboard one can get matches ordered by
  // their total score. If matches have the same total score
  // most recently started match is returned first.
  useEffect(() => {
    setSortedMatches(getMatchesSummary());
  }, [matches]);

  return (
    <>
      <Scoreboard matches={matches} />
      <Scoreboard matches={sortedMatches} />
    </>
  );
}
```

_Note:_ From the instructions it seemed like there should be an option to retain original match order and have a possibility of getting sorted matches via "match summary". If I am incorrect and matches should always be sorted, then `getMatchesSummary` method should be

## Local development

1. `npm run install` will install necessary dependencies.
2. `npm run test` will run all available tests.
3. `npm run build` will output compiled CommonJS and ECMAScript modules to `dist` directory.

## Example app

You can run example app in example folder as a demonstration of this library. Its important that library was already built using `npm run build` in root folder and that dependency on library is not a symlink, otherwise there would be multiple copies of React in example app. To install library in example folder without symlinks run `npm install .. --install-links`.
