'use strict';
import { Transaction } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async ({ context }) => {
    const { queryInterface } = context;

    const transaction: Transaction =
      await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'Users',
        {
          id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },

          username: {
            type: DataType.STRING,
            allowNull: false,
          },

          email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
          },

          password: {
            type: DataType.STRING,
            allowNull: false,
          },

          createdAt: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: DataType.NOW,
          },

          updatedAt: {
            type: DataType.DATE,
            allowNull: true,
            defaultValue: DataType.NOW,
          },
        },
        {
          transaction,
        },
      );

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
