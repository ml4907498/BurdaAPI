import express from 'express';
import contents from './contents';
import users from './users';
import authentication from './authentication';
import permission from './permission';

const router = express.Router();

export default (): express.Router => {
  contents(router);
  users(router);
  authentication(router);
  permission(router);

  return router;
};
