import { originURL } from "./origin";
import axios, { AxiosResponse } from "axios";

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
    return data;
  } catch (err: any) {
    return err.message;
  }
};
