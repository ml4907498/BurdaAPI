import express from 'express';

import { getUsers, getUserById, createUser } from '../db/users';
import { generateUUID } from '../helpers';
import { User } from '../interfaces/users';

const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users: User[] = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const user: User = await getUserById(id);
    console.log(id);
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: 'User not found!' });
  }
};

const addUser = async (req: express.Request, res: express.Response) => {
  try {
    const { partnerId, key } = req.body;

    if (!partnerId || !key) {
      return res.sendStatus(400);
    }
    const _id = generateUUID();
    const user: User = await createUser({
      _id,
      partnerId,
      key,
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export { getAllUsers, getUser, addUser };
