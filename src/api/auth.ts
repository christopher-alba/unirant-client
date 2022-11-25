import { originURL } from "./origin";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import axios, { AxiosResponse } from "axios";

export const fetchCurrentUser = async (
  setFetchingUser: Dispatch<SetStateAction<any>>,
  localToken: string
) => {
  setFetchingUser(true);
  const response: AxiosResponse = await axios.post(
    originURL + "/api/v1/getuser",
    {
      localToken,
    },
    {
      withCredentials: true,
    }
  );
  const data = response.data;
  return data;
};

export const login = async (userData: {
  username: string;
  password: string;
}) => {
  const response: AxiosResponse = await axios.post(
    originURL + "/api/v1/auth/default/login",
    userData,
    {
      withCredentials: true,
    }
  );
  localStorage.setItem("localToken", response.data);
  const data = response.data;
  return data;
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
