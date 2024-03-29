import { Router } from 'express';

import {
  getContent,
  addContent,
  deleteContent,
  getAllContents,
} from '../controllers/contents';

import { isAuthenticated, isAuthorized } from '../middlewares';

export default (router: Router) => {
  router.get('/content/:id', isAuthenticated, isAuthorized, getContent);
  router.post('/content', isAuthenticated, isAuthorized, addContent);
  router.delete('/content/:id', isAuthenticated, isAuthorized, deleteContent);
  router.get('/contents', isAuthenticated, isAuthorized, getAllContents);
};
