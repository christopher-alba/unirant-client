import { useAuth0 } from "@auth0/auth0-react";
import { Formik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Loader, Segment } from "semantic-ui-react";
import { fetchUserProfile, updateUserProfile } from "../../api/profile";
import AuthContext, { UserInfo } from "../../contexts/AuthContext";

const EditProfile: FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState<UserInfo>();
  const [message, setMessage] = useState("");
  const [fetchingProfile, setFetchingProfile] = useState(false);
  const [image, setImage] = useState(user?.profilePicture);
  const [wallpaper, setWallpaper] = useState(user?.wallpaper);
  const { getAccessTokenSilently, isLoading } = useAuth0();
  const getBase64 = (file: File, cb: CallableFunction) => {
    if (file.size > 1 * Math.pow(10, 6)) {
      console.log(file.size);

      setMessage("File is too large");
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
      setMessage("File selection successful");
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const getProfile = async () => {
    setFetchingProfile(true);
    setUserProfile(
      await fetchUserProfile(
        user?.username as any,
        await getAccessTokenSilently().catch((err) => console.log(err))
      )
    );
    setImage(user?.profilePicture);
    setWallpaper(user?.wallpaper);
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
      <Formik
        initialValues={{
          displayName: userProfile?.displayName,
          profilePicture: userProfile?.profilePicture,
          wallpaper: userProfile?.wallpaper,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const accessToken = await getAccessTokenSilently().catch((err) =>
            console.log(err)
          );
          const response = await updateUserProfile(
            user?.username as any,
            accessToken,
            values
          );
          setMessage(response);
          setUser(await fetchUserProfile(user?.username as any, accessToken));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <p>{userProfile?._id}</p>
              <p>{userProfile?.username}</p>
              <p>{userProfile?.email}</p>
              <input
                type="text"
                name="displayName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.displayName}
              />
              <p>Email Verified: {userProfile?.emailVerified.toString()}</p>
              <input
                type="file"
                name="profilePicture"
                onChange={(evt) => {
                  const updateProfileImage = (base64: string) => {
                    values.profilePicture = base64;
                    setImage(base64);
                  };
                  getBase64(evt.target.files?.[0] as any, updateProfileImage);
                }}
              />
              <img
                src={
                  image ||
                  "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                }
                alt="profilePic"
                referrerPolicy="no-referrer"
              />
              <input
                type="file"
                name="wallpaper"
                onChange={(evt) => {
                  const updateWallpaper = (base64: string) => {
                    values.wallpaper = base64;
                    setWallpaper(base64);
                  };
                  getBase64(evt.target.files?.[0] as any, updateWallpaper);
                }}
              />
              <img
                src={wallpaper}
                alt="wallpaper"
                referrerPolicy="no-referrer"
              />
              <Button type="submit" primary disabled={isSubmitting}>
                Update Profile
              </Button>
              <p>{message}</p>
            </div>
          </form>
        )}
      </Formik>
    );
  }
};

export default EditProfile;
