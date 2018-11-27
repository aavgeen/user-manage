import _ from 'lodash';
import Group from '../models/group.model';
import errorHandler from '../helpers/dbErrorHandler';

const create = (req, res) => {
  const group = new Group(req.body);
  group.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.status(200).json({
              message: 'Group Successfully created!',
              group_id: '',
            });
  });
};

/**
 * Load group and append to req.
 */
const groupByID = (req, res, next, id) => {
    Group.findById(id).exec((err, group) => {
    if (err || !group)
      return res.status(400).json({
        error: 'User not found',
      });
    req.profile = group;
    next();
  });
};

const groupByName = (req, res) => {
  const sn = req.searchName;
  Group.find(
    { name: new RegExp(sn, 'i') },
    () =>
      function(err, groups) {
        if (err)
          return res.status(400).json({
            error: 'Groups not found'
          });
        res.json(groups);
      }
  ).select('name about updated created user_ids ');
};

const read = (req, res) =>  res.json(req.profile);

const list = (req, res) => {
    Group.find((err, groups) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(groups);
  }).select('name about updated created user_ids');
};

const update = (req, res) => {
  let group = req.profile;
  group = _.extend(group, req.body);
  group.updated = Date.now();
  group.save(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(group);
  });
};

const remove = (req, res) => {
  const group = req.profile;
  group.remove((err, deletedGroup) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(deletedGroup);
  });
};

export default {
  create,
  groupByID,
  read,
  list,
  remove,
  update,
  groupByName
};
