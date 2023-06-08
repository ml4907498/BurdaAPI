import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, reuqired: true },
  partnerId: { type: String, reuqired: true },
  description: { type: String, select: true },
  originalUrl: { type: String, select: true },
  publishDate: { type: String, select: true },
  paragraph: { type: String, select: true },
});

export const ContentModel = mongoose.model('Content', ContentSchema);

export const createContent = (values: Record<string, any>) =>
  new ContentModel(values).save().then((content) => content.toObject());

export const getContentById = (id: string) => ContentModel.findById(id);
