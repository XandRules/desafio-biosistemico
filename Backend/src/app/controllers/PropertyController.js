import * as Yup from 'yup';

import Property from '../models/Property';

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

    if (PropertyExists) {
      return res.status(500).json({
        message: 'Property already exists.'
      });
    }

    let newProperty = null;

    try {
      console.log(req.body);
      newProperty = await Property.create(req.body);
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

}

export default new PropertyController();
