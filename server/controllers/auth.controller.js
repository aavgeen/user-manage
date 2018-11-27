import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import User from '../models/user.model';
import config from '../../config/config';

const signin = (req, res) => {
  if (
    req.body.email === 'random@random.com' &&
    req.body.password === 'randompass'
  ) {
    const token = jwt.sign(
      {
        _id: 'dwdw3j2k3j3k'
      },
      config.jwtSecret
    );

    res.cookie('t', token, {
      expire: new Date() + 9999
    });

    return res.json({
      token,
      user: { name: req.body.email }
    });
  }

  return res.status('401').send({
    error: "Email and password don't match."
  });
};



const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status('403').json({
      error: 'User is not authorized'
    });
  }
  next();
};

export default {
  signin,
  hasAuthorization
};
