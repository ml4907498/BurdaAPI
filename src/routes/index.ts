import express from 'express';
import content from './content';

const router = express.Router();

export default (): express.Router => {
  content(router);
  return router;
};
