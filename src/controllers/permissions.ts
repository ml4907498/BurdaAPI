import { Request, Response } from 'express';
import {
  getPermissions,
  getPermissionById,
  createPermission,
  getPermissionByPartnerId,
} from '../db/permissions';

import { generateUUID } from '../helpers';
import { Permission } from './../interfaces/permissions';

//  Retrieves all permissions
const getAllPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await getPermissions();

    return res.status(200).json(permissions);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Retrieves a specific permission by its partnerId
const getPermission = async (req: Request, res: Response) => {
  try {
    const { partnerId } = req.params;
    const permission = await getPermissionByPartnerId(partnerId);
    console.log(partnerId);
    return res.status(200).json(permission).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Adds a new permission item
const addPermission = async (req: Request, res: Response) => {
  try {
    const { partnerId, access } = req.body;

    if (!partnerId || !access) {
      return res.sendStatus(400);
    }

    // generate a random UUID
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
