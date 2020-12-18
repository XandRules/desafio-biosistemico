
import People from '../models/People';
import Property from '../models/Property';
import User from '../models/User';

class DashboardController {
 
  async index(req, res) {
    const userTotal = await User.count();

    const peopleAdmin = await People.count({
      where:{
        role:'Administrador'
      }
    });

    const peopleOwer = await People.count({
      where:{
        role:'Proprietário'
      }
    });

    const peopleTech = await People.count({
      where:{
        role:'Técnico'
      }
    });

    const property = await Property.count();

    return res.json([
      {"Perfil": 'Número de Usuários', "Total" : userTotal},
      {"Perfil": 'Administradores', "Total" : peopleAdmin},
      {"Perfil": 'Proprietários', "Total" : peopleOwer},
      {"Perfil": 'Técnicos', "Total" : peopleTech},
      {"Perfil": 'Propriedades', "Total" : property},
    ]);
  }

}

export default new DashboardController();
