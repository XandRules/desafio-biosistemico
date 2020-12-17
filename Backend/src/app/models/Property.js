import Sequelize, {
  Model
} from 'sequelize';

class Property extends Model {
  static init(sequelize) {
    // migration de Propriedades
    super.init({
      name: Sequelize.STRING,
      people_id: Sequelize.NUMBER,
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {

    this.belongsTo(models.People, {
      foreignKey: 'people_id',
      as: 'people'
    });
  }
}
export default Property;
