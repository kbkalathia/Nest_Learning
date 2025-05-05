import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from 'src/configs/database.config';
import { MigrationService } from 'src/libs/migration.service';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig)],
  providers: [MigrationService],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private migrationService: MigrationService) {}

  async onModuleInit() {
    try {
      await this.migrationService.runMigrations();
    } catch (err) {
      throw new Error(err);
    }
  }
}
