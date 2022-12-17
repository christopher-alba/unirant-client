import React, { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { fetchCurrentUserInWrapper } from "../api/auth";
import { joinCommunity, leaveCommunity } from "../api/community";
import AuthContext from "../contexts/AuthContext";

const LeaveAndJoinCommunity: FC<{
  community: any;
  getAccessTokenSilently: any;
  auth0user: any;
  isLoading: any;
  fetchCommunities: any;
}> = ({
  community,
  getAccessTokenSilently,
  auth0user,
  isLoading,
  fetchCommunities,
}) => {
  const [awaitingAPI, setAwaitingAPI] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleJoinCommunity = async (id: string) => {
    if (auth0user) {
      setAwaitingAPI(true);
      const token = await getAccessTokenSilently();
      await joinCommunity(id, user?._id as any, token);
      setUser(await fetchCurrentUserInWrapper(token, auth0user));
      await fetchCommunities();
      setAwaitingAPI(false);
    } else {
      navigate("/login");
    }
  };

  const handleLeaveCommunity = async (id: string) => {
    if (auth0user) {
      setAwaitingAPI(true);
      const token = await getAccessTokenSilently();
      await leaveCommunity(id, user?._id as any, token);
      setUser(await fetchCurrentUserInWrapper(token, auth0user));
      await fetchCommunities();
      setAwaitingAPI(false);
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      {community.adminIDs.includes(user?._id as any) ? (
        <Button
          color="red"
          disabled={isLoading || awaitingAPI}
          onClick={() => handleLeaveCommunity(community._id)}
        >
          Leave Group
        </Button>
      ) : community.memberIDs?.includes(user?._id as any) ? (
        <Button
          color="red"
          disabled={isLoading || awaitingAPI}
          onClick={() => handleLeaveCommunity(community._id)}
        >
          Leave Group
        </Button>
      ) : (
        <Button
          color="green"
          onClick={() => handleJoinCommunity(community._id)}
          disabled={isLoading || awaitingAPI}
        >
          Join Group
        </Button>
      )}
    </>
  );
};

export default LeaveAndJoinCommunity;
