import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import People from '../models/People';

class SessionController {
  async store(req, res) {
    const {
      username,
      password
    } = req.body;

    console.log("req.body", username)

    const people = await People.findOne({
      where: {
        email
      }
    });

    console.log("encontrou usuario", people)

    if (!people) {
      return res.json({
        error: 'People not found'
      });
    }

    if (!(await people.checkPassword(password))) {
      return res.json({
        error: 'Password does not match'
      });
    }

    return res.json({
      people: {
        people
      },
      token: jwt.sign({
        id,
        email
      }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

}

export default new SessionController();
