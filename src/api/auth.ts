import { originURL } from "./origin";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import axios, { AxiosResponse } from "axios";

export const fetchCurrentUser = async (
  setFetchingUser: Dispatch<SetStateAction<any>>,
  localToken: string
) => {
  setFetchingUser(true);
  try {
    const response: AxiosResponse = await axios.post(
      originURL + "/api/v1/getuser",
      {
        localToken,
      },
      {
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

export const login = async (userData: {
  username: string;
  password: string;
}) => {
  type ReturnObject = {
    loggedIn: boolean;
    message: string;
  };
  try {
    const response: AxiosResponse = await axios.post(
      originURL + "/api/v1/auth/default/login",
      userData,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("localToken", response.data);
    const data: ReturnObject = {
      loggedIn: true,
      message: "User login was successful.",
    };
    return data;
  } catch (err: any) {
    const data: ReturnObject = {
      loggedIn: false,
      message: err.message,
    };
    return data;
  }
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response: AxiosResponse = await axios.post(
    originURL + "/api/v1/auth/default/register",
    userData
  );
  const data = response.data;
  return data;
};

export const logout = async (userId: string) => {
  const response: AxiosResponse = await axios.post(
    originURL + "/api/v1/auth/logout",
    userId,
    {
      withCredentials: true,
    }
  );
  const data = response.data;
  return data;
};
