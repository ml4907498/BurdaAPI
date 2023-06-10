import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, reuqired: true },
  partnerId: { type: String, reuqired: true },
  description: { type: String, reuqired: true },
  originalUrl: { type: String, reuqired: true },
  publishDate: { type: String, reuqired: true },
  paragraph: { type: String, reuqired: true },
});

export const ContentModel = mongoose.model('Content', ContentSchema);

export const createContent = (values: Record<string, any>) =>
  new ContentModel(values).save().then((content) => content.toObject());

export const getContentById = (id: string) =>
  ContentModel.findById(id).then((content) => content.toObject());

export const deleteContentById = (id: string) =>
  ContentModel.findOneAndDelete({ _id: id }).then((content) =>
    content.toObject(),
  );
