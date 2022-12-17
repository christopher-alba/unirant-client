import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchCurrentUserInWrapper } from "../../api/auth";
import {
  getAllCommunities,
  getSpecificCommunities,
  joinCommunity,
} from "../../api/community";
import AuthContext from "../../contexts/AuthContext";
import CommunityContext, {
  Community as CommunityType,
} from "../../contexts/CommunityContext";
import {
  HeaderWrapper,
  MemberCount,
  Name,
  StyledButton,
  TextWrapper,
  Wallpaper,
  WallpaperWrapper,
} from "./styled";

const Community: FC = () => {
  const [community, setCommunity] = useState<CommunityType>();
  const { user, setUser } = useContext(AuthContext);
  const { setCommunities } = useContext(CommunityContext);
  const { getAccessTokenSilently, isLoading, user: auth0user } = useAuth0();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    fetchCommunity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const fetchCommunity = async () => {
    setCommunity(
      (await getSpecificCommunities([searchParams.get("id") as any]))[0]
    );
  };
  const handleJoinCommunity = async () => {
    if (auth0user) {
      const token = await getAccessTokenSilently();
      await joinCommunity(
        searchParams.get("id") as any,
        user?._id as any,
        token
      );
      setUser(await fetchCurrentUserInWrapper(token, auth0user));
      await fetchCommunity();
      setCommunities(await getAllCommunities());
    } else {
      navigate("/login");
    }
  };
  if (community) {
    return (
      <HeaderWrapper>
        <WallpaperWrapper>
          <Name>{community.name} Community</Name>
          {community.adminIDs.includes(user?._id as any) ? (
            <StyledButton color="red" disabled={isLoading}>
              Leave Group
            </StyledButton>
          ) : community.memberIDs?.includes(user?._id as any) ? (
            <StyledButton color="red" disabled={isLoading}>
              Leave Group
            </StyledButton>
          ) : (
            <StyledButton
              primary
              onClick={handleJoinCommunity}
              disabled={isLoading}
            >
              Join Group
            </StyledButton>
          )}
          <Wallpaper src={community.wallpaper} />
        </WallpaperWrapper>
        <TextWrapper>
          <MemberCount>
            Members:{" "}
            {community.adminIDs.length + (community.memberIDs as any).length}
          </MemberCount>
          <p>{community.description}</p>
        </TextWrapper>
      </HeaderWrapper>
    );
  } else {
    return <p>Attempting to fetch community...</p>;
  }
};

export default Community;
