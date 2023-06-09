import express from 'express';

import { getUserById } from '../db/users';
import { User } from '../interfaces/users';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.sendStatus(400);
    }

    const user: User = await getUserById(id);
    if (!user) {
      return res.sendStatus(400);
    }

    res.cookie('PARTERID', user.partnerId, { domain: 'localhost', path: '/' });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};