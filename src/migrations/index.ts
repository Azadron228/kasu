import * as migration_20260402_110044 from './20260402_110044';

export const migrations = [
  {
    up: migration_20260402_110044.up,
    down: migration_20260402_110044.down,
    name: '20260402_110044'
  },
];
