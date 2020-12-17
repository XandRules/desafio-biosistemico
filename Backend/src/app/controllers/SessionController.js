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
      return res.json({
        error: 'user not found'
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.json({
        error: 'Password does not match'
      });
    }

    return res.json({
      jwt: jwt.sign({
        id,
        email
      }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

}

export default new SessionController();
