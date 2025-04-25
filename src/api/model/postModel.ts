import { UploadedImage } from "@/schema/image";
import { AddressData } from "@/schema/kakao-addr";

export interface PostModel {
  id?: string;
  images: UploadedImage[];
  location: string;
  address: AddressData;
  date: Date;
  description: string;
  createdAt: Date;
}
