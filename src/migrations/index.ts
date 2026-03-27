import * as migration_20260327_184054 from './20260327_184054';
import * as migration_20260327_184647 from './20260327_184647';

export const migrations = [
  {
    up: migration_20260327_184054.up,
    down: migration_20260327_184054.down,
    name: '20260327_184054',
  },
  {
    up: migration_20260327_184647.up,
    down: migration_20260327_184647.down,
    name: '20260327_184647'
  },
];
