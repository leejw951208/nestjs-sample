import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'sample',
  password: 'sample1234!',
  database: 'sample-db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  logging: true,
};
