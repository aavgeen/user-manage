import _ from 'lodash';
import User from '../models/user.model';
import errorHandler from '../helpers/dbErrorHandler';
import Group from '../models/group.model';

const create = (req, res) => {
  const user = new User(req.body);
  user.save(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.status(200).json({
      message: 'Successfully created the user!',
      user_id: ''
    });
  });
};

/**
 * Load user and append to req.
 */
const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status(400).json({
        error: 'User not found'
      });
    req.profile = user;
    next();
  });
};

const userByName = (req, res) => {
  const sn = req.searchName;
  User.find(
    { name: new RegExp(sn, 'i') },
    () =>
      function(err, users) {
        if (err)
          return res.status(400).json({
            error: 'Users not found'
          });
        res.json(users);
      }
  ).select('name email about citizen_of updated created group_ids');
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(users);
  }).select('name email about citizen_of updated created group_ids');
};

const update = (req, res) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

const remove = (req, res) => {
  const user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    // delete the user from all the groups
    for (let i = 0; i < deletedUser.group_ids.length; i += 1) {
      Group.update(
        { _id: deletedUser.group_ids[i] },
        { $pull: { group_ids: deletedUser._id } }
      );
    }
    res.json(deletedUser);
  });
};

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  userByName
};
