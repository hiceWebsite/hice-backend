/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TProduct = {
  codeNumber: string;
  title: string;
  category: string;
  twoDUrl: string;
  threeDUrl: string;
  isDeleted: boolean;
};

export interface ProductModel extends Model<TProduct> {
  isProductExistsByCodeNumber(codeNumber: string): Promise<TProduct | null>;
}
