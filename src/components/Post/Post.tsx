import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useContext, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Icon } from "semantic-ui-react";
import { updateCommunityPost } from "../../api/community";
import AuthContext from "../../contexts/AuthContext";
import { Post as PostType } from "../../contexts/CommunityContext";
import { LikeAndDislikeWrapper, MainDiv, StyledButton } from "./styled";

const Post: FC<{ post: PostType; setPosts: Function; posts: PostType[] }> = ({
  post,
  setPosts,
  posts,
}) => {
  const [awaitingAPI, setAwaitingAPI] = useState(false);
  const { user } = useContext(AuthContext);
  const { getAccessTokenSilently } = useAuth0();
  const userLikedPost = () => {
    return (
      (post.likesArray.find((likeID) => likeID === user?._id)?.length || -1) > 0
    );
  };
  const userDislikedPost = () => {
    return (
      (post.dislikesArray.find((dislikeID) => dislikeID === user?._id)
        ?.length || -1) > 0
    );
  };
  const disableLikeButton = (() => userDislikedPost())();
  const disableDislikeButton = (() => userLikedPost())();
  const handleLike = async () => {
    setAwaitingAPI(true);
    let postCopy = { ...post };
    if (userDislikedPost()) {
      postCopy.dislikesArray = postCopy.dislikesArray.filter(
        (dislikeIDs) => dislikeIDs !== user?._id
      );
    }
    if (userLikedPost()) {
      postCopy.likesArray = postCopy.likesArray.filter(
        (likeIDs) => likeIDs !== user?._id
      );
    } else {
      postCopy.likesArray.push(user?._id as string);
    }

    await updateCommunityPost(postCopy, await getAccessTokenSilently());
    setPosts(() => {
      return posts.map((postObj) => {
        if (postObj._id === post._id) {
          return postCopy;
        } else {
          return postObj;
        }
      });
    });
    setAwaitingAPI(false);
  };
  const handleDislike = async () => {
    setAwaitingAPI(true);
    let postCopy = { ...post };
    if (userLikedPost()) {
      postCopy.likesArray = postCopy.likesArray.filter(
        (likeIDs) => likeIDs !== user?._id
      );
    }
    if (userDislikedPost()) {
      postCopy.dislikesArray = postCopy.dislikesArray.filter(
        (dislikeIDs) => dislikeIDs !== user?._id
      );
    } else {
      postCopy.dislikesArray.push(user?._id as string);
    }
    await updateCommunityPost(postCopy, await getAccessTokenSilently());
    setPosts(() => {
      return posts.map((postObj) => {
        if (postObj._id === post._id) {
          return postCopy;
        } else {
          return postObj;
        }
      });
    });
    setAwaitingAPI(false);
  };
  return (
    <MainDiv>
      <LikeAndDislikeWrapper>
        <StyledButton
          onClick={handleLike}
          disabled={awaitingAPI || disableLikeButton}
          active={userLikedPost()}
          likeOrDislike="like"
        >
          <Icon name="chevron up" style={{ margin: 0 }} />
        </StyledButton>
        {post.likesArray.length - post.dislikesArray.length}
        <StyledButton
          onClick={handleDislike}
          disabled={awaitingAPI || disableDislikeButton}
          active={userDislikedPost()}
          likeOrDislike="dislike"
        >
          <Icon name="chevron down" style={{ margin: 0 }} />
        </StyledButton>
      </LikeAndDislikeWrapper>
      <div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <Carousel>
          {post.images.map((img) => (
            <div>
              <img style={{ width: "100%" }} src={img} alt="" />
            </div>
          ))}
        </Carousel>
      </div>
    </MainDiv>
  );
};

export default Post;
