import { login } from './authentication';
import * as UserDB from '../db/users';
import { Request, Response } from 'express';

describe('login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return user and set cookie', async () => {
    // Mock request and response objects
    const mockReq: Partial<Request> = { body: { id: 'test123' } };
    const mockRes: Partial<Response> = {
      sendStatus: jest.fn(),
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the getUserById function
    const getUserByIdMock = jest.spyOn(UserDB, 'getUserById');
    const userMock = {
      _id: 'test123',
      partnerId: '456',
      key: 'Test Description',
    };
    getUserByIdMock.mockResolvedValueOnce(userMock);

    // Call the login function
    await login(mockReq as Request, mockRes as Response);

    // Assert the expected behavior
    expect(getUserByIdMock).toHaveBeenCalledWith('test123');
    expect(getUserByIdMock).toHaveBeenCalledTimes(1);
    expect(mockRes.cookie).toHaveBeenCalledWith(
      'PARTERID',
      userMock.partnerId,
      { domain: 'localhost', path: '/' },
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(userMock);
  });

  // test('should handle missing id and return 400 status', async () => {
  //   // Mock request and response objects
  //   const mockReq: Partial<Request> = { body: {} };
  //   const mockRes: Partial<Response> = {
  //     sendStatus: jest.fn(),
  //   };

  //   // Call the login function
  //   await login(mockReq as Request, mockRes as Response);

  //   // Assert the expected behavior
  //   expect(mockRes.sendStatus).toHaveBeenCalledWith(400);
  // });

  test('should return 404 error if user is not found', async () => {
    // Mock data
    const userId = 'nonexistent';

    // Mock request and response objects
    const mockReq: Partial<Request> = { body: { id: userId } };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock getUserById function to return null (user not found)
    const getUserByIdMock = jest.spyOn(UserDB, 'getUserById');
    getUserByIdMock.mockResolvedValueOnce(null);

    // Call the login function
    await login(mockReq as Request, mockRes as Response);

    // Assertions
    expect(getUserByIdMock).toHaveBeenCalledWith(userId);
    expect(getUserByIdMock).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: 'User not found!' });
  });

  // ... Additional test cases ...
});
