import express from 'express';
import { merge, get } from 'lodash';
import { UUID } from 'interfaces/contents';
import { Permission, ACCESS } from 'interfaces/permissions';

// import { getUserBySessionToken } from '../db/users';
import { getPermissionByPartnerId } from '../db/permissions';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const partnerId: UUID = req.cookies['PARTERID'];

    if (!partnerId) {
      return res.sendStatus(403);
    }

    const permission = await getPermissionByPartnerId(partnerId);

    if (!permission) {
      return res.sendStatus(403);
    }

    merge(req, { access: permission.access });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthorized = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const requestType: string = req.method;
    const access = get(req, 'access');
    console.log(access);
    if (!access) {
      return res.sendStatus(400);
    }
    switch (requestType) {
      case 'GET':
        if (access === 'READ' || access === 'BOTH') {
          next();
        } else {
          return res.sendStatus(401);
        }
        break;
      case 'POST' || 'DELETE':
        if (access === 'WRITE' || access === 'BOTH') {
          next();
        } else {
          return res.sendStatus(401);
        }
        break;
      default:
        return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
