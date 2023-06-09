import mongoose from 'mongoose';

// User Config
const PermissionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  partnerId: { type: String, required: true },
  access: { type: String, required: true },
});

export const PermissionModel = mongoose.model('Permission', PermissionSchema);

// Permission Actions
export const getPermissions = () => PermissionModel.find();
export const getPermissionById = (id: string) => PermissionModel.findById(id);

export const getPermissionByPartnerId = (partnerId: string) =>
  PermissionModel.findOne({ partnerId });

export const createPermission = (values: Record<string, any>) =>
  new PermissionModel(values)
    .save()
    .then((permission) => permission.toObject());
