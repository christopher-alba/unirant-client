import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Loader, Popup, Segment } from "semantic-ui-react";
import { fetchUserProfile } from "../../api/profile";
import { MainContentCard } from "../../components/MainContentCard";
import {
  StatusPillError,
  StatusPillSuccess,
} from "../../components/StatusPills";
import { StyledH1, StyledH3, StyledPHeading } from "../../components/Titles";
import AuthContext, { UserInfo } from "../../contexts/AuthContext";
import {
  InfoPanel,
  ProfileBackgroundDiv,
  ProfileBackgroundImg,
  ProfileBannerContentWrapper,
  ProfileDisplayName,
  ProfilePicture,
  TruncatedText,
} from "./styled";

const Profile: FC = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState<UserInfo>();
  const [fetchingProfile, setFetchingProfile] = useState(false);
  const { getAccessTokenSilently, isLoading } = useAuth0();
  const getProfile = async () => {
    setFetchingProfile(true);
    setUserProfile(
      await fetchUserProfile(
        user?.username as any,
        await getAccessTokenSilently().catch((err) => console.log(err))
      )
    );
    setFetchingProfile(false);
  };
  useEffect(() => {
    if (user && !isLoading) {
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  if (fetchingProfile || isLoading) {
    return (
      <Segment>
        Fetching Profile...
        <Loader active />
      </Segment>
    );
  } else {
    return (
      <MainContentCard>
        <StyledH1>Your Private Profile</StyledH1>
        <ProfileBackgroundDiv>
          <ProfilePicture
            src={
              userProfile?.profilePicture ||
              "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
            }
            alt="profilePic"
            referrerPolicy="no-referrer"
          />
          <ProfileBackgroundImg src={userProfile?.wallpaper} />
          <ProfileBannerContentWrapper>
            <ProfileDisplayName>{userProfile?.displayName}</ProfileDisplayName>
            <Link to="/profile/edit">
              <Button fluid primary>
                Update Profile
              </Button>
            </Link>
          </ProfileBannerContentWrapper>
        </ProfileBackgroundDiv>
        <InfoPanel>
          <StyledH3>Private Information</StyledH3>
          <StyledPHeading>MongoDB Atlas ID</StyledPHeading>
          <p>
            {userProfile?._id}{" "}
            <Popup
              content={`successfully copied ${userProfile?._id} to clipboard`}
              on="click"
              trigger={
                <Button
                  icon
                  size="tiny"
                  primary
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    navigator.clipboard.writeText(userProfile?._id as any);
                  }}
                >
                  <Icon name="copy" />
                </Button>
              }
            />
          </p>
          <StyledPHeading>Email</StyledPHeading>
          <p>
            {userProfile?.email}{" "}
            <Popup
              content={`successfully copied ${userProfile?.email} to clipboard`}
              on="click"
              trigger={
                <Button
                  icon
                  size="tiny"
                  primary
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    navigator.clipboard.writeText(userProfile?.email as any);
                  }}
                >
                  <Icon name="copy" />
                </Button>
              }
            />
          </p>
          <StyledPHeading>Unique Username</StyledPHeading>
          <p style={{ display: "flex", alignItems: "center" }}>
            <TruncatedText>{userProfile?.username} </TruncatedText>
            <Popup
              content={`successfully copied ${userProfile?.username} to clipboard`}
              on="click"
              trigger={
                <Button
                  icon
                  size="tiny"
                  primary
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    navigator.clipboard.writeText(userProfile?.username as any);
                  }}
                >
                  <Icon name="copy" />
                </Button>
              }
            />
          </p>

          <StyledPHeading>Email Status</StyledPHeading>
          <p>
            {userProfile?.emailVerified ? (
              <StatusPillSuccess>Verified</StatusPillSuccess>
            ) : (
              <StatusPillError>Not Verified</StatusPillError>
            )}
          </p>
        </InfoPanel>
      </MainContentCard>
    );
  }
};

export default Profile;
