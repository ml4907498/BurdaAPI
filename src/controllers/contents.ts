import { Request, Response } from 'express';

import {
  getContentById,
  createContent,
  deleteContentById,
  getContents,
} from '../db/contents';

import { generateUUID } from '../helpers';
import { Content } from 'interfaces/contents';

const getContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const content = await getContentById(id);
    console.log(id);
    return res.status(200).json(content);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: 'Content not found!' });
  }
};

const addContent = async (req: Request, res: Response) => {
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
    const _id = generateUUID();
    const content = await createContent({
      _id,
      title,
      partnerId,
      description,
      originalUrl,
      publishDate,
      paragraph,
    });
    return res.status(200).json(content);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedContent = await deleteContentById(id);

    return res.json(deletedContent);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const getAllContents = async (req: Request, res: Response) => {
  try {
    const contents = await getContents();

    return res.status(200).json(contents);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export { getContent, addContent, deleteContent, getAllContents };
