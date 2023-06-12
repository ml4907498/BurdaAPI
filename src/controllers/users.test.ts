import { getUser } from './users';
import * as UserDB from '../db/users';
import { Request, Response } from 'express';

afterEach(() => {
  jest.resetAllMocks();
});

describe('getUser', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return user from the database', async () => {
    // Mock user data
    const userId = 'test123';
    const userMock = {
      _id: 'test123',
      partnerId: '456',
      key: 'Test Description',
    };

    // Mock request and response objects
    const mockReq: Partial<Request> = { params: { id: userId } };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn(),
      json: jest.fn(),
    };

    // Call the getUser function
    const getUserByIdMock = jest.spyOn(UserDB, 'getUserById');
    getUserByIdMock.mockResolvedValueOnce(userMock);
    await getUser(mockReq as Request, mockRes as Response);

    // Assertion
    expect(getUserByIdMock).toHaveBeenCalledWith(userId);
    expect(getUserByIdMock).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(userMock);
  });

  test('should handle error and return 400 status', async () => {
    // Mock request and response objects
    const userId = '123';
    const mockReq: Partial<Request> = { params: { id: userId } };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock getUserById function to throw an error
    const getUserByIdMock = jest.spyOn(UserDB, 'getUserById');
    const error = new Error('User not found!');
    getUserByIdMock.mockRejectedValueOnce(error);

    // Call the getUser function
    await getUser(mockReq as Request, mockRes as Response);

    // Assertion
    expect(getUserByIdMock).toHaveBeenCalledWith(userId);
    expect(getUserByIdMock).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: 'User not found!' });
  });
});
