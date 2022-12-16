import { originURL } from "./origin";
import axios, { AxiosResponse } from "axios";

type UpdateProfileObj = {
  profilePicture: string | undefined;
  displayName: string | undefined;
};

export const fetchUserProfile = async (
  username: string,
  token: string | void
) => {
  try {
    const response: AxiosResponse = await axios.get(
      originURL + "/api/v1/profile/" + username,
      {
        headers: {
          authorization: "Bearer " + token,
        },
        withCredentials: true,
      }
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const updateUserProfile = async (
  username: string,
  token: string | void,
  profileObject: UpdateProfileObj
) => {
  try {
    const response: AxiosResponse = await axios.post(
      originURL + "/api/v1/profile/" + username,
      profileObject,
      {
        headers: {
          authorization: "Bearer " + token,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err: any) {
    return err.response.data;
  }
};
