import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useContext, useEffect, useState } from "react";
import { getUserRelatedPosts } from "../../api/community";
import Post from "../../components/Post";
import AuthContext from "../../contexts/AuthContext";
import { Post as PostType } from "../../contexts/CommunityContext";

const Feed: FC = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostType[]>();
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const fetchPosts = async () => {
    const postsResponse = await getUserRelatedPosts(
      user?._id as string,
      await getAccessTokenSilently()
    );
    console.log(postsResponse);
    setPosts(postsResponse);
  };
  return (
    <div>
      <h1>Feed. Welcome {user?.username}</h1>
      {posts?.map((post) => (
        <Post post={post} setPosts={setPosts} posts={posts} />
      ))}
    </div>
  );
};

export default Feed;
