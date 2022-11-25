import React, { Dispatch, SetStateAction } from "react";

export type UserInfo = {
  _id: string;
  username: string;
  googleId?: string;
};

type AuthContextType = {
  user: UserInfo | undefined;
  setUser: Dispatch<SetStateAction<any>>;
  fetchingUser: boolean;
  setFetchingUser: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
  fetchingUser: false,
  setFetchingUser: () => {},
});

export default AuthContext;