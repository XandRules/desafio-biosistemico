import * as Yup from 'yup';

import Property from '../models/Property';

class PropertyController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),           
      people_id: Yup.number().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.json('Validation fail');
    }

    const PropertyExists = await Property.findOne({
      where: {
        login: req.body.login
      },
    });

    if (PropertyExists) {
      return res.json({
        error: 'Property already exists.'
      });
    }

    let newProperty = null;

    try {
      console.log(req.body);
      newProperty = await Property.create(req.body);
    } catch (error) {
      return res.json({
        error: error.name
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
