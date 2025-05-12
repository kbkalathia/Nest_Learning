'use strict';
import { Transaction } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async ({ context }) => {
    const { queryInterface } = context;

    const transaction: Transaction =
      await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('Users', 'refreshToken', {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      });

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
