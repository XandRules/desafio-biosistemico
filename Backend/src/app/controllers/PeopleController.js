import * as Yup from 'yup';

import People from '../models/People';

class PeopleController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),     
      lastname: Yup.string().required(), 
      cpf: Yup.string().required(),
      role: Yup.string().required(),      

    });

    if (!(await schema.isValid(req.body))) {
      return res.json('Validation fail');
    }

    const PeopleExists = await People.findOne({
      where: {
        cpf: req.body.cpf
      },
    });

    if (PeopleExists) {
      return res.json({
        error: 'People already exists.'
      });
    }

    let newPeople = null;

    try {
      console.log(req.body);
      newPeople = await People.create(req.body);
    } catch (error) {
      return res.json({
        error: error.name
      });
    }

    return res.json({
      newPeople
    });
  }  

  async index(req, res) {
    const people = await People.findAll();

    return res.json(people);
  }

}

export default new PeopleController();
