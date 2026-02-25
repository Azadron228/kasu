import * as migration_20260225_100131 from './20260225_100131';

export const migrations = [
  {
    up: migration_20260225_100131.up,
    down: migration_20260225_100131.down,
    name: '20260225_100131'
  },
];
