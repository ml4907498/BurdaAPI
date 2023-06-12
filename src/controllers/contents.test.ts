import { getContent, addContent, deleteContent } from './contents';
import * as ContentDB from '../db/contents';
import { Request, Response } from 'express';

afterEach(() => {
  jest.resetAllMocks();
});

describe('getContent', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return content from the database', async () => {
    // Mock the content data
    const contentId = 'test123';
    const contentMock = {
      _id: 'test123',
      title: 'Test Title',
      partnerId: '456',
      description: 'Test Description',
      originalUrl: 'http://example.com',
      publishDate: '2022-01-01',
      paragraph: 'Test Paragraph',
    };
    // Mock request and response objects
    const mockReq: Partial<Request> = { params: { id: contentId } };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the getContentById function
    const getContentByIdMock = jest.spyOn(ContentDB, 'getContentById');
    getContentByIdMock.mockResolvedValueOnce(contentMock);

    // Call the getContent function
    await getContent(mockReq as Request, mockRes as Response);

    // Assert the expected behavior
    expect(getContentByIdMock).toHaveBeenCalledWith(contentId);
    expect(getContentByIdMock).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(contentMock);
  });

  test('should handle error and return 400 status', async () => {
    // Mock request and response objects
    const contentId = 'test123';
    const mockReq: Partial<Request> = { params: { id: contentId } };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const getContentByIdMock = jest.spyOn(ContentDB, 'getContentById');
    const error = new Error('Content not found!');
    getContentByIdMock.mockRejectedValueOnce(error);

    await getContent(mockReq as Request, mockRes as Response);

    // Assert the expected behavior
    expect(getContentByIdMock).toHaveBeenCalledWith(contentId);
    expect(getContentByIdMock).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Content not found!' });
  });
});

describe('addContent', () => {
  test('should create content and return it', async () => {
    // Mock request and response objects
    const mockReq: Partial<Request> = {
      body: {
        title: 'Test Title',
        partnerId: '456',
        description: 'Test Description',
        originalUrl: 'http://example.com',
        publishDate: '2022-01-01',
        paragraph: 'Test Paragraph',
      },
    };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the return json of response
    const contentMock = {
      _id: expect.any(String),
      title: 'Test Title',
      partnerId: '456',
      description: 'Test Description',
      originalUrl: 'http://example.com',
      publishDate: '2022-01-01',
      paragraph: 'Test Paragraph',
    };

    const createContentMock = jest.spyOn(ContentDB, 'createContent');
    createContentMock.mockResolvedValueOnce(contentMock);

    await addContent(mockReq as Request, mockRes as Response);

    // Assert the expected behavior
    expect(createContentMock).toHaveBeenCalledWith(
      expect.objectContaining(mockReq.body),
    );
    expect(createContentMock).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(contentMock);
  });

  test('should handle missing fields and return 400 status', async () => {
    const mockReq: Partial<Request> = {
      body: {
        // Missing some required fields
      },
    };
    const mockRes: Partial<Response> = {
      sendStatus: jest.fn(),
    };

    await addContent(mockReq as Request, mockRes as Response);

    expect(mockRes.sendStatus).toHaveBeenCalledWith(400);
  });
});

describe('deleteContent', () => {
  test('should delete content and return it', async () => {
    // Mock request and response objects
    const contentId = 'test123';
    const mockReq: Partial<Request> = { params: { id: contentId } };
    const mockRes: Partial<Response> = {
      json: jest.fn(),
    };

    // Mock the return json of response
    const deletedContentMock = {
      _id: 'test123',
      title: 'Test Title',
      partnerId: '456',
      description: 'Test Description',
      originalUrl: 'http://example.com',
      publishDate: '2022-01-01',
      paragraph: 'Test Paragraph',
    };

    const deleteContentByIdMock = jest.spyOn(ContentDB, 'deleteContentById');
    deleteContentByIdMock.mockResolvedValueOnce(deletedContentMock);

    await deleteContent(mockReq as Request, mockRes as Response);

    // Assert the expected behavior
    expect(deleteContentByIdMock).toHaveBeenCalledWith(contentId);
    expect(deleteContentByIdMock).toHaveBeenCalledTimes(1);
    expect(mockRes.json).toHaveBeenCalledWith(deletedContentMock);
  });

  test('should handle error and return 400 status', async () => {
    // Mock request and response objects
    const contentId = 'test123';
    const mockReq: Partial<Request> = { params: { id: contentId } };
    const mockRes: Partial<Response> = {
      sendStatus: jest.fn(),
    };

    const deleteContentByIdMock = jest.spyOn(ContentDB, 'deleteContentById');
    const error = new Error('Content not found!');
    deleteContentByIdMock.mockRejectedValueOnce(error);

    await deleteContent(mockReq as Request, mockRes as Response);

    // Assert the expected behavior
    expect(deleteContentByIdMock).toHaveBeenCalledWith(contentId);
    expect(deleteContentByIdMock).toHaveBeenCalledTimes(1);
    expect(mockRes.sendStatus).toHaveBeenCalledWith(400);
  });
});
