import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { getAllCommunities } from "../../api/community";
import LeaveAndJoinCommunity from "../../components/LeaveAndJoinCommunity";
import CreateCommunityModal from "../../components/Modals/CreateCommunityModal";
import { StatusPillBasic } from "../../components/StatusPills";
import { StyledH1 } from "../../components/Titles";
import CommunityContext, { Community } from "../../contexts/CommunityContext";
import {
  CommunityWrapper,
  ContentWrapper,
  ExtraInfo,
  ExtraWrapper,
  HeadingWrapper,
  Image,
  Name,
  StyledP,
} from "./styled";

const Communities: FC = () => {
  const { isLoading, user: auth0user, getAccessTokenSilently } = useAuth0();
  const { communities, setCommunities } = useContext(CommunityContext);
  const fetchCommunities = async () => {
    const response = await getAllCommunities();
    console.log(response);
    setCommunities(response);
  };
  useEffect(() => {
    fetchCommunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeadingWrapper>
        <StyledH1>Browse Communities</StyledH1>
        {!isLoading && !auth0user && (
          <StatusPillBasic>Sign in to create a community.</StatusPillBasic>
        )}
        {!isLoading && auth0user && <CreateCommunityModal />}
      </HeadingWrapper>

      {communities?.map((community: Community) => {
        console.log(typeof community.creationDate);
        return (
          <CommunityWrapper>
            <Image src={community.wallpaper} />
            <ContentWrapper>
              <div>
                <Name>{community.name}</Name>
                <StyledP>{community.description}</StyledP>
              </div>
              <div>
                <Link to={`/community?id=` + community._id}>
                  <Button tabIndex={-1} primary>
                    Visit
                  </Button>
                </Link>
                <LeaveAndJoinCommunity
                  community={community}
                  getAccessTokenSilently={getAccessTokenSilently}
                  auth0user={auth0user}
                  isLoading={isLoading}
                  fetchCommunities={fetchCommunities}
                />
              </div>
            </ContentWrapper>
            <ExtraWrapper>
              <ExtraInfo>
                Members:{" "}
                {(community.memberIDs?.length || 0) + community.adminIDs.length}
              </ExtraInfo>
              <ExtraInfo style={{ fontSize: "0.7rem" }}>
                Date Created:{" "}
                {new Date(community.creationDate).toLocaleDateString()}
              </ExtraInfo>
            </ExtraWrapper>
          </CommunityWrapper>
        );
      })}
    </>
  );
};

export default Communities;
