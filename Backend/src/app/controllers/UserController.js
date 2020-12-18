import * as Yup from 'yup';

import User from '../models/User';
import bcrypt from 'bcryptjs';
import People from '../models/People';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().required(),     
      password: Yup.string().required(), 
      cpf: Yup.number().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(500).json({message: 'Validation fail'});
    }

    const UserExists = await User.findOne({
      where: {
        login: req.body.login
      },
    });

    if (UserExists) {
      return res.status(500).json({
        message: 'Usuário já existe.'
      });
    }

    const people = await People.findOne({
      where:{
        cpf: req.body.cpf
      }
    });

    if(!people){
      return res.status(500).json('CPF não cadastrado');
    }

    let newUser = null;

    try {
      console.log(req.body);
      const password_hash =  await bcrypt.hash(req.body.password, 8);
      newUser = await User.create({
        login: req.body.login,
        password_hash: password_hash,
        people_id: people.id
      });
    } catch (error) {
      return res.json({
        error: error.name
      });
    }

    return res.json({
      newUser
    });
  }  

  async index(req, res) {
    const user = await User.findAll();

    return res.json(user);
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        login: Yup.string(),
        oldPassword: Yup.string(),
        password: Yup.string()
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });

      const {
        oldPassword
      } = req.body;

      
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(500).json({
          message: 'Usuário não encontrado'
        });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({
          message: 'Senha não confere'
        });
      }

      const userUpdated = await user.update(
        req.body
      );

      return res.json(userUpdated);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          "message": error
        });
      }
    }

  }

  async delete(req, res) {

    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(500).json({
          error: 'Usuário não encontrado'
        });
      }


      const response = await User.destroy({
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

export default new UserController();
