import { Request, Response } from 'express';

import { getUsers, getUserById, createUser } from '../db/users';
import { generateUUID } from '../helpers';
import { User } from '../interfaces/users';

// Retrieves all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Retrieves a specific user by id
const getUser = async (req: Request, res: Response) => {
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

//  Adds a new user
const addUser = async (req: Request, res: Response) => {
  try {
    const { partnerId, key } = req.body;

    // check the required params
    if (!partnerId || !key) {
      return res.sendStatus(400);
    }

    // generate a random UUID
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
