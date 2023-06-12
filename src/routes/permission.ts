import express from 'express';

import {
  getAllPermissions,
  getPermission,
  addPermission,
} from '../controllers/permissions';

export default (router: express.Router) => {
  router.get('/permissions', getAllPermissions);
  router.get('/permission/:partnerId', getPermission);
  router.post('/permission', addPermission);
};
