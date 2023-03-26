import React, { Dispatch, SetStateAction } from "react";

export type CreatePostObj = {
  title: string;
  description: string;
  images: string[];
};

export type Post = {
  _id: string;
  profileID: string;
  title: string;
  description: string;
  likesArray: string[];
  dislikesArray: string[];
  images: string[];
  creationDate: Date;
  commentIDs: string[];
};

export type Community = {
  _id: string;
  name: string;
  description?: string;
  adminIDs: string[];
  creationDate: string;
  memberIDs?: string[];
  wallpaper?: string;
  posts?: Post[];
};

type CommunityContextType = {
  communities: Community[] | undefined;
  setCommunities: Dispatch<SetStateAction<Community[] | undefined>>;
};

const CommunityContext = React.createContext<CommunityContextType>({
  communities: undefined,
  setCommunities: () => {},
});

export default CommunityContext;
