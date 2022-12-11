import { originURL } from "./origin";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import axios, { AxiosResponse } from "axios";
import { User } from "@auth0/auth0-react";

export const fetchCurrentUser = async (
  setFetchingUser: Dispatch<SetStateAction<any>>,
  localToken: string | void,
  auth0user: User | undefined
) => {
  setFetchingUser(true);
  console.log(auth0user);
  try {
    const response: AxiosResponse = await axios.post(
      originURL + "/api/v1/getuser",
      { user: auth0user },
      {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
        withCredentials: true,
      }
    );
    setFetchingUser(false);
    const data = response.data;
    return data;
  } catch (err: any) {
    setFetchingUser(false);
    return err.message;
  }
};

export const fetchCurrentUserInWrapper = async (
  localToken: string | void,
  auth0user: User | undefined
) => {
  console.log(auth0user);
  try {
    const response: AxiosResponse = await axios.post(
      originURL + "/api/v1/getuser",
      { user: auth0user },
      {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
        withCredentials: true,
      }
    );
    const data = response.data;
    return data;
  } catch (err: any) {
    return err.message;
  }
};
