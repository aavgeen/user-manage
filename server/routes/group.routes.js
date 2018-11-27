import express from 'express';
import groupCtrl from '../controllers/group.controller';

const router = express.Router();

router
  .route('/api/group')
  .get(groupCtrl.list)
  .post(groupCtrl.create);

router
  .route('/api/group/:groupId')
  .get(groupCtrl.read)
  .put(groupCtrl.update)
  .delete(groupCtrl.remove);

router.param('groupId', groupCtrl.groupByID);

export default router;
