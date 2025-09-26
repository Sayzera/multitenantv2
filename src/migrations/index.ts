import * as migration_20250824_195430_migration from './20250824_195430_migration';

export const migrations = [
  {
    up: migration_20250824_195430_migration.up,
    down: migration_20250824_195430_migration.down,
    name: '20250824_195430_migration'
  },
];
