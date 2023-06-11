import { Request, Response } from 'express';
import {
  getPermissions,
  getPermissionById,
  createPermission,
} from '../db/permissions';

import { generateUUID } from '../helpers';
import { Permission } from './../interfaces/permissions';

const getAllPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await getPermissions();

    return res.status(200).json(permissions);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const getPermission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const permission = await getPermissionById(id);
    console.log(id);
    return res.status(200).json(permission).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const addPermission = async (req: Request, res: Response) => {
  try {
    const { partnerId, access } = req.body;

    if (!partnerId || !access) {
      return res.sendStatus(400);
    }
    const _id = generateUUID();
    const permission = await createPermission({
      _id,
      partnerId,
      access,
    });
    return res.status(200).json(permission).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export { getAllPermissions, getPermission, addPermission };
