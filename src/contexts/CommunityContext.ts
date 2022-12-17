import React, { Dispatch, SetStateAction } from "react";

export type Community = {
  _id: string;
  name: string;
  description?: string;
  adminIDs: string[];
  creationDate: Date;
  memberIDs?: string[];
  wallpaper?: string;
};

type CommunityContextType = {
  communities: Community[] | undefined;
  setCommunities: Dispatch<SetStateAction<any>>;
};

const CommunityContext = React.createContext<CommunityContextType>({
  communities: undefined,
  setCommunities: () => {},
});

export default CommunityContext;
