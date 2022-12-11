import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useContext, useEffect, useState } from "react";
import { Loader, Segment } from "semantic-ui-react";
import { fetchUserProfile } from "../../api/profile";
import AuthContext, { UserInfo } from "../../contexts/AuthContext";

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
      <div>
        <p>{userProfile?._id}</p>
        <p>{userProfile?.displayName}</p>
        <p>{userProfile?.email}</p>
        <p>{userProfile?.username}</p>
        <p>Email Verified: {userProfile?.emailVerified.toString()}</p>
        <img
          src={
            userProfile?.profilePicture ||
            "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
          }
          alt="profilePic"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }
};

export default Profile;
