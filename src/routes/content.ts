import { Router } from 'express';

import { getContent, addContent } from '../controllers/content';

export default (router: Router) => {
  router.post('/content', addContent);
  // router.get('/content:id', getContent);
};

// const router = express.Router();

// router.get('/content', async (req, res) => {
//   const controller = new ContentController();
//   const response = await controller.getContentById();
//   return res.send(response);
// });

// export default router;
