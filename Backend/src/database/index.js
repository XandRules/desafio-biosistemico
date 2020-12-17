import Sequelize from 'sequelize';

import People from '../app/models/People';
import User from '../app/models/User';
import Property from '../app/models/Property';

import databaseConfig from '../config/database';

const models = [
  People,
  User,
  Property
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
