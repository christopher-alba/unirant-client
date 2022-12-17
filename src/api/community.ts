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

export const getSpecificCommunities = async (communitiesIDs: string[]) => {
  try {
    const response: AxiosResponse = await axios.post(
      originURL + "/api/v1/community/specific",
      { communitiesIDs },
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

export const joinCommunity = async (
  communityID: string,
  userID: string,
  token: string
) => {
  try {
    const response: AxiosResponse = await axios.post(
      originURL + "/api/v1/community/join",
      {
        communityID,
        userID,
      },
      {
        headers: {
          authorization: "Bearer " + token,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (err: any) {
    console.log(err);
    return err.response.data;
  }
};
export const leaveCommunity = async (
  communityID: string,
  userID: string,
  token: string
) => {
  try {
    const response: AxiosResponse = await axios.post(
      originURL + "/api/v1/community/leave",
      {
        communityID,
        userID,
      },
      {
        headers: {
          authorization: "Bearer " + token,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (err: any) {
    console.log(err);
    return err.response.data;
  }
};
