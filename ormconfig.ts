module.exports = {
  type: 'mysql',
  url: 'mysql://root:root@localhost:3306/pc-builders',
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  entities: [getEntityDirectory()],
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'src/common/infrastructure/persistence/typeorm/migrations',
  },
};

function getEntityDirectory() {
  const path = 'dist/src/**/infrastructure/persistence/typeorm/entities/*.js';
  return path;
}

function getMigrationDirectory() {
  const path =
    'dist/src/common/infrastructure/persistence/typeorm/migrations/*.js';
  return path;
}
