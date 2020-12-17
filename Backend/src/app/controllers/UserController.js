import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().required(),     
      password_hash: Yup.string().required(), 
      people_id: Yup.number().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.json('Validation fail');
    }

    const UserExists = await User.findOne({
      where: {
        login: req.body.login
      },
    });

    if (UserExists) {
      return res.json({
        error: 'User already exists.'
      });
    }

    let newUser = null;

    try {
      console.log(req.body);
      newUser = await User.create(req.body);
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

}

export default new UserController();
