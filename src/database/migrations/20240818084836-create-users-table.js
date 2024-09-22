'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('users',
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                userName: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                    unique: true,
                    field: 'user_name',
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                },
                phoneNumber: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                    field: 'phone_number',
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                code: {
                    type: Sequelize.STRING,
                    allowNull: true,
                    defaultValue: null,
                },
                codeExpiredAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: null,
                    field: 'code_expired_at'
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                    field: 'created_at',
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                    field: 'updated_at',
                }
            });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('users');
    }
};
