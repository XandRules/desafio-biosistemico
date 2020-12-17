import Sequelize, {
  Model
} from 'sequelize';

class People extends Model {
  static init(sequelize) {
    // migration de Pessoas
    super.init({
      name: Sequelize.STRING,
      cpf: Sequelize.STRING,
      role: Sequelize.STRING,
      lastname: Sequelize.STRING,
    }, {
      sequelize,
    });

    return this;
  }

}
export default People;
