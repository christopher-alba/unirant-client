import { useAuth0 } from "@auth0/auth0-react";
import { Formik } from "formik";
import React, { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal } from "semantic-ui-react";
import { fetchCurrentUserInWrapper } from "../../../api/auth";
import { createCommunity, getAllCommunities } from "../../../api/community";
import { fetchUserProfile } from "../../../api/profile";
import AuthContext from "../../../contexts/AuthContext";
import CommunityContext from "../../../contexts/CommunityContext";
import { StyledImg } from "./styled";

const CreateCommunityModal: FC = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [wallpaper, setWallpaper] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const { getAccessTokenSilently, isLoading, user: auth0user } = useAuth0();
  const { setCommunities } = useContext(CommunityContext);
  const navigate = useNavigate();

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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setWallpaper("");
    setMessage("");
    setFormSubmitting(false);
    setOpen(false);
  };
  return (
    <Modal
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      trigger={<Button primary>Create Community</Button>}
    >
      <Modal.Header>Create a new community.</Modal.Header>
      <Modal.Content>
        {!isLoading && auth0user ? (
          <Formik
            initialValues={{
              name: "",
              description: "",
              wallpaper: `https://picsum.photos/2000/3000?random=${
                Math.random() * Number.MAX_VALUE
              }`,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(true);
              setFormSubmitting(true);
              const accessToken = await getAccessTokenSilently().catch((err) =>
                console.log(err)
              );
              const mongoUser = await fetchCurrentUserInWrapper(
                accessToken,
                auth0user
              );
              console.log(mongoUser);
              const response = await createCommunity(
                {
                  ...values,
                  adminIDs: [mongoUser._id],
                },
                accessToken
              );
              const allCommunities = await getAllCommunities();
              setCommunities(allCommunities);
              setMessage(response);
              setUser(
                await fetchUserProfile(user?.username as any, accessToken)
              );
              setSubmitting(false);
              setFormSubmitting(false);
              navigate(
                "/community?id=" +
                  allCommunities?.[allCommunities?.length - 1]._id
              );
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
              <form onSubmit={handleSubmit} id="mainForm">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
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
                  <StyledImg
                    src={
                      wallpaper ||
                      `https://picsum.photos/2000/3000?random=${
                        Math.random() * Number.MAX_VALUE
                      }`
                    }
                    alt="wallpaper"
                    referrerPolicy="no-referrer"
                  />
                  <p>{message}</p>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <p>Loading User...</p>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          type="submit"
          form="mainForm"
          disabled={formSubmitting}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CreateCommunityModal;
