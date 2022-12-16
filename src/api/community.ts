import { originURL } from "./origin";
import axios, { AxiosResponse } from "axios";

export const createCommunity = async (
  communityObj: {
    name: string;
    description: string;
    adminIDs: [string];
    wallpaper: string;
  },
  token: string | void
) => {
  try {
    const response: AxiosResponse = await axios.post(
      originURL + "/api/v1/community",
      communityObj,
      {
        headers: {
          authorization: "Bearer " + token,
        },
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return err.response.data;
  }
};

export const getAllCommunities = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      originURL + "/api/v1/community/all",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return err.response.data;
  }
};
