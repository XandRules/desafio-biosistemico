module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      people_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'People',
          key: 'id'
        },
        unique: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      disabled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => {
    return queryInterface.dropTable('User');
  },
};
