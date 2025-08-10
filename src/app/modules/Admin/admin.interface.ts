import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TAdmin = {
  user: Types.ObjectId;
  name: TUserName;
  email: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(email: string): Promise<TAdmin | null>;
}
