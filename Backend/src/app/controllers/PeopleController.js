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
      return res.status(500).json('Validation fail');
    }

    const PeopleExists = await People.findOne({
      where: {
        cpf: req.body.cpf
      },
    });

    if (PeopleExists) {
      return res.status(500).json({
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

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        lastname: Yup.string(),
        role: Yup.string(),      

      });

      await schema.validate(req.body, {
        abortEarly: false,
      });
      
      const people = await People.findByPk(req.params.id);

      if (!people) {
        return res.status(500).json({
          error: 'Usuário não encontrado'
        });
      }


      const peopleUpdated = await people.update(
        req.body
      );

      return res.json(peopleUpdated);

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
      const people = await People.findByPk(req.params.id);

      if (!people) {
        return res.status(500).json({
          error: 'Usuário não encontrado'
        });
      }


      const response = await People.destroy({
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

export default new PeopleController();
