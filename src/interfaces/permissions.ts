type UUID = string;

export enum ACCESS {
  READ = 'READ',
  WRITE = 'WRITE',
  BOTH = 'BOTH',
}

export interface Permission {
  _id: UUID;
  partnerId: UUID;
  access: ACCESS;
}
