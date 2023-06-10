import mongoose from 'mongoose';

// User Config
const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  partnerId: { type: String, required: true },
  key: { type: String, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserById = (id: string) =>
  UserModel.findById(id).then((user) => user.toObject());
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
