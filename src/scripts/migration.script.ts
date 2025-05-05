import * as path from 'path';
import * as fs from 'fs';
import * as arg from 'process';
import * as moment from 'moment';

const migration_file_template = `
'use strict';
import { Transaction } from 'sequelize';

module.exports = {
  up: async ({ context }) => {
    const { queryInterface } = context;

    const transaction: Transaction =
      await queryInterface.sequelize.transaction();

    try {
      await transaction.commit();
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
        throw error;
      }
    }
  },
  down: async ({ context }) => {
    const { queryInterface } = context;

    const transaction: Transaction =
      await queryInterface.sequelize.transaction();

    try {
      await transaction.commit();
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
        throw error;
      }
    }
  },
};
`;

(async () => {
  const timestamp = moment().format('YYYYMMDDHHmmss');

  if (arg.env.npm_config_name) {
    const folder_path = path.join(__dirname, '..', 'migrations');
    if (!fs.existsSync(folder_path)) fs.mkdirSync(folder_path);

    const migration_file_name = `${timestamp}-${arg.env.npm_config_name}.ts`;
    fs.writeFileSync(
      `${folder_path}/${migration_file_name}`,
      migration_file_template,
    );
    console.log(
      `Migration file created - ${folder_path}/${migration_file_name}`,
    );
  } else {
    console.error(
      `Give name of migration file as $ npm run make:migration --name=filename`,
    );
  }
})();
