import { Request, Response } from 'express';
import { getUserByPartnerId } from '../db/users';
import { User } from '../interfaces/users';

// Login by partnerId for Authentication
export const login = async (req: Request, res: Response) => {
  try {
    const { partnerId } = req.body;
    const user: User = await getUserByPartnerId(partnerId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    // Set a cookie named "PARTERID" with the user's partnerId
    res.cookie('PARTERID', user.partnerId, { domain: 'localhost', path: '/' });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
