import { Avatar } from "./AvatarType";

export type NFTDataType = {
  id: string | number;
  image: any;
  name: string;
  creator: string;
  date: string;
  comments: number;
  views: number;
  price: number | string;
  topBid: string;
  address: string;
  tokenId: string | number;
  tokenSt: string;
  blockchain: string;
  avatars: Avatar[];
};
