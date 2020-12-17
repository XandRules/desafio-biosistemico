import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const {
      username,
      password
    } = req.body;

    console.log("req.body", username)

    const user = await User.findOne({
      where: {
        login: username
      }
    });

    if (!user) {
      return res.status(500).json({
        message: 'Usuário não encontrado.'
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(500).json({
        message: 'Senha não confere.'
      });
    }

    return res.json({
      jwt: jwt.sign({
        id: user.id,
        username
      }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

}

export default new SessionController();
