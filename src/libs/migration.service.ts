import 'ts-node/register';
import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import { Injectable } from '@nestjs/common';
import { sequelizeConfig } from 'src/configs/database.config';

@Injectable()
export class MigrationService {
  private sequelize: Sequelize;
  private umzug: Umzug;

  constructor() {
    this.sequelize = new Sequelize(sequelizeConfig);
    this.umzug = new Umzug({
      migrations: {
        glob: 'src/migrations/*.ts',
      },
      context: {
        queryInterface: this.sequelize.getQueryInterface(),
      },
      storage: new SequelizeStorage({ sequelize: this.sequelize }),
      logger: console,
    });
  }

  public async runMigrations() {
    try {
      console.log('🚀 Running migrations...');
      await this.umzug.up();
      console.log('🎉 Migrations completed successfully.');
      return;
    } catch (error) {
      console.error('❗ Failed to run migrations:', error);
      return;
    }
  }
}
