import express from 'express';

import { getAllUsers, getUser, addUser } from '../controllers/users';

export default (router: express.Router) => {
  router.get('/users', getAllUsers);
  router.get('/user/:id', getUser);
  router.post('/user', addUser);
};
