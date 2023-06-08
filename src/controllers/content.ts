type UUID = string;

interface Image {
  _id: UUID;
  title: string;
  alt: string;
  height: string;
  width: string;
  createDate: string;
  source: string;
  credits: string;
}

interface Video {
  _id: UUID;
  summary: string;
  title: string;
  source: string;
  createDate: string;
  isAdsEnabled: boolean;
  author: string;
}

type Media = Image | Video;

interface Content {
  _id: UUID;
  title: string;
  partnerId: UUID;
  description: string;
  originalUrl: string;
  publishDate: string;
  paragraph: string;
  // media: Media[]; // media can be image or video
}

const fakeContent: Content = {
  _id: '123',
  title: '123',
  partnerId: '123',
  description: '123',
  originalUrl: '123',
  publishDate: '123',
  paragraph: '123',
};

// export default class ContentController {

//   async getContentById() {
//     return fakeContent;
//   }
// }

import express from 'express';

import { getContentById, createContent } from '../db/content';

const getContent = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const content = await getContentById(id);

    return res.status(200).json(content).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const addContent = async (req: express.Request, res: express.Response) => {
  try {
    const {
      title,
      partnerId,
      description,
      originalUrl,
      publishDate,
      paragraph,
    } = req.body;

    if (
      !title ||
      !partnerId ||
      !description ||
      !originalUrl ||
      !publishDate ||
      !paragraph
    ) {
      return res.sendStatus(400);
    }
    const _id = 'test';
    const content = await createContent({
      _id,
      title,
      partnerId,
      description,
      originalUrl,
      publishDate,
      paragraph,
    });
    return res.status(200).json(content).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export { getContent, addContent };
