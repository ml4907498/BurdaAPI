type UUID = string;

export interface User {
  _id: UUID;
  partnerId: UUID;
  key: string;
}
