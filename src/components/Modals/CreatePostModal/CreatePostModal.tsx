import { useAuth0 } from "@auth0/auth0-react";
import { Formik } from "formik";
import React, { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Input, Modal } from "semantic-ui-react";
import { fetchCurrentUserInWrapper } from "../../../api/auth";
import { createCommunityPost, getAllCommunities } from "../../../api/community";
import AuthContext from "../../../contexts/AuthContext";
import CommunityContext, {
  CreatePostObj,
} from "../../../contexts/CommunityContext";
import { StyledImg, StyledP } from "./styled";

const CreatePostModal: FC<{
  communityID: string;
  fetchCommunityPosts: Function;
}> = ({ communityID, fetchCommunityPosts }) => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [wallpaper, setWallpaper] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const { getAccessTokenSilently, isLoading, user: auth0user } = useAuth0();
  const { setCommunities } = useContext(CommunityContext);
  const navigate = useNavigate();

  const getBase64 = (file: File, cb: CallableFunction) => {
    if (file.size > 5 * Math.pow(10, 6)) {
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

  const handleCreatePost = async () => {
    if (!auth0user) {
      navigate("/login");
    }
  };

  return (
    <Modal
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      trigger={
        <Button primary icon labelPosition="right" onClick={handleCreatePost}>
          Create Post <Icon name="plus" />
        </Button>
      }
    >
      <Modal.Header>Create a new post.</Modal.Header>
      <Modal.Content>
        {!isLoading && auth0user ? (
          <Formik
            initialValues={
              {
                title: "",
                description: "",
                images: [],
              } as CreatePostObj
            }
            onSubmit={async (values, { setSubmitting }) => {
              const post: CreatePostObj = {
                title: values.title,
                description: values.description,
                images: values.images,
              };

              setSubmitting(true);
              setFormSubmitting(true);
              const token = await getAccessTokenSilently();
              await createCommunityPost(
                communityID,
                user?._id as any,
                post,
                token
              );
              setUser(await fetchCurrentUserInWrapper(token, auth0user));
              await fetchCommunityPosts();
              setCommunities(await getAllCommunities());
              handleClose();
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
                    name="title"
                    placeholder="Title"
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
                    name="images"
                    onChange={(evt) => {
                      const updateWallpaper = (base64: string) => {
                        values.images = [base64];
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
                  <StyledP>{message}</StyledP>
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

export default CreatePostModal;
