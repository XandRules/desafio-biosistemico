import Sequelize, {
  Model
} from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // migration de Usuarios
    super.init({
      login: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      people_id: Sequelize.NUMBER,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {

    this.belongsTo(models.People, {
      foreignKey: 'people_id',
      as: 'people'
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
