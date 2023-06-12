import express from 'express';
import { merge, get } from 'lodash';
import { UUID } from 'interfaces/contents';
import { Permission, ACCESS } from 'interfaces/permissions';

import { getPermissionByPartnerId } from '../db/permissions';

// Middleware for checking if is authenticated (login)
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const partnerId: UUID = req.cookies['PARTERID'];

    // Check if cookies not exist
    if (!partnerId) {
      return res.sendStatus(403);
    }

    // Check if permission exist for this user
    const permission = await getPermissionByPartnerId(partnerId);

    if (!permission) {
      return res.sendStatus(403);
    }

    // Store the access value in reqest, which will be used by next Authorization check
    merge(req, { access: permission.access });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Middleware for checking if is authorized for this operation
export const isAuthorized = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const requestType: string = req.method;
    const access = get(req, 'access');

    if (!access) {
      return res.sendStatus(400);
    }

    switch (requestType) {
      // GET actions only allowed by READ or BOTH permission.
      case 'GET':
        if (access === 'READ' || access === 'BOTH') {
          next();
        } else {
          return res.sendStatus(401);
        }
        break;
      // POST actions only allowed by WRITE or BOTH permission.
      case 'POST':
        if (access === 'WRITE' || access === 'BOTH') {
          next();
        } else {
          return res.sendStatus(401);
        }
        break;
      // DELETE actions only allowed by WRITE or BOTH permission.
      case 'DELETE':
        console.log('here');
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
