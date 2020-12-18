import * as Yup from 'yup';

import Property from '../models/Property';
import People from '../models/People'

class PropertyController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),           
      cpf: Yup.string().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(500).json('Validation fail');
    }

    console.log('REQQQQQ',req.body)

    const PropertyExists = await Property.findOne({
      where: {
        name: req.body.name
      },
    });

    const people = await People.findOne({
      where:{
        cpf: req.body.cpf
      }
    });

    if(!people){
      return res.status(500).json('CPF não cadastrado');
    }

    if(people.role !== 'Proprietário'){
      return res.status(500).json({message: 'Propriedade deve ser vinculada a proprietário'});
    }

    let newProperty = null;

    try {
      console.log(req.body);
      newProperty = await Property.create({
        name: req.body.name,
        people_id: people.id
      });
    } catch (error) {
      return res.status(500).json({
        message: error.name
      });
    }

    return res.json({
      newProperty
    });
  }
  
  async index(req, res) {
    const property = await Property.findAll();

    return res.json(property);
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        people_id: Yup.string(),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });
      
      const property = await Property.findByPk(req.params.id);

      if (!property) {
        return res.status(500).json({
          error: 'Propriedade não encontrada'
        });
      }


      const propertyUpdated = await property.update(
        req.body
      );

      return res.json(propertyUpdated);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          "error": error
        });
      }
    }

  }

  async delete(req, res) {

    try {
      const property = await Property.findByPk(req.params.id);

      if (!property) {
        return res.status(500).json({
          error: 'Usuário não encontrado'
        });
      }


      const response = await Property.destroy({
        where: {
          id: req.params.id
        }
      });

      return res.json(response);

    } catch (error) {
      return res.json({
        error: error
      });
    }

  }

}

export default new PropertyController();
