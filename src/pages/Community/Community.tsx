import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { fetchCurrentUserInWrapper } from "../../api/auth";
import {
  getAllCommunities,
  getCommunityPosts,
  getSpecificCommunities,
  joinCommunity,
  leaveCommunity,
} from "../../api/community";
import CreatePostModal from "../../components/Modals/CreatePostModal";
import AuthContext from "../../contexts/AuthContext";
import CommunityContext, {
  Community as CommunityType,
  Post,
} from "../../contexts/CommunityContext";
import {
  HeaderWrapper,
  MemberCount,
  Name,
  StyledButtonWrapper,
  TextWrapper,
  Wallpaper,
  WallpaperWrapper,
} from "./styled";

const Community: FC = () => {
  const [community, setCommunity] = useState<CommunityType>();
  const [posts, setPosts] = useState<Post[]>();
  const [awaitingAPI, setAwaitingAPI] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const { setCommunities } = useContext(CommunityContext);
  const { getAccessTokenSilently, isLoading, user: auth0user } = useAuth0();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    fetchCommunity();
    fetchCommunityPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const fetchCommunity = async () => {
    setCommunity(
      (await getSpecificCommunities([searchParams.get("id") as any]))[0]
    );
  };
  const fetchCommunityPosts = async () => {
    setPosts(await getCommunityPosts(searchParams.get("id") as any));
  };
  const handleJoinCommunity = async () => {
    if (auth0user) {
      setAwaitingAPI(true);
      const token = await getAccessTokenSilently();
      await joinCommunity(
        searchParams.get("id") as any,
        user?._id as any,
        token
      );
      setUser(await fetchCurrentUserInWrapper(token, auth0user));
      await fetchCommunity();
      setCommunities(await getAllCommunities());
      setAwaitingAPI(false);
    } else {
      navigate("/login");
    }
  };

  const handleLeaveCommunity = async () => {
    if (auth0user) {
      setAwaitingAPI(true);
      const token = await getAccessTokenSilently();
      await leaveCommunity(
        searchParams.get("id") as any,
        user?._id as any,
        token
      );
      setUser(await fetchCurrentUserInWrapper(token, auth0user));
      await fetchCommunity();
      setCommunities(await getAllCommunities());
      setAwaitingAPI(false);
    } else {
      navigate("/login");
    }
  };

  if (community) {
    return (
      <>
        <HeaderWrapper>
          <WallpaperWrapper>
            <Name>{community.name} Community</Name>
            {community.adminIDs.includes(user?._id as any) ? (
              <StyledButtonWrapper>
                <Button
                  color="red"
                  disabled={isLoading || awaitingAPI}
                  onClick={handleLeaveCommunity}
                >
                  Leave Group
                </Button>
                <CreatePostModal
                  communityID={community._id}
                  fetchCommunityPosts={fetchCommunityPosts}
                />
              </StyledButtonWrapper>
            ) : community.memberIDs?.includes(user?._id as any) ? (
              <StyledButtonWrapper>
                <Button
                  color="red"
                  disabled={isLoading || awaitingAPI}
                  onClick={handleLeaveCommunity}
                >
                  Leave Group
                </Button>
                <CreatePostModal
                  communityID={community._id}
                  fetchCommunityPosts={fetchCommunityPosts}
                />
              </StyledButtonWrapper>
            ) : (
              <StyledButtonWrapper>
                <Button
                  primary
                  onClick={handleJoinCommunity}
                  disabled={isLoading || awaitingAPI}
                >
                  Join Group
                </Button>
              </StyledButtonWrapper>
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
        <div>
          {posts?.map((post) => {
            return <h1>{JSON.stringify(post)}</h1>;
          })}
        </div>
      </>
    );
  } else {
    return <p>Attempting to fetch community...</p>;
  }
};

export default Community;
