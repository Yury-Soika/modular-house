import * as migration_20260904_125942_cms_initial from './20260904_125942_cms_initial';

export const migrations = [
  {
    up: migration_20260904_125942_cms_initial.up,
    down: migration_20260904_125942_cms_initial.down,
    name: '20260904_125942_cms_initial'
  },
];
