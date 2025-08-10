import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TBuyer = {
  user: Types.ObjectId;
  name: TUserName;
  email: string;
  address: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface BuyerModel extends Model<TBuyer> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(email: string): Promise<TBuyer | null>;
}
