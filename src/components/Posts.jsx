import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export const Posts = ({ setPostId }) => {
  const postsQuery = useQuery("posts", async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => res.data);
  });
  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? "..." : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          "Loading..."
        ) : (
          <ul>
            {postsQuery.data.map((post) => (
              <li key={post.id}>
                <a onClick={() => setPostId(post.id)} href='#'>
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const Post = ({ postId, setPostId }) => {
  const postQuery = useQuery(["post", postId], async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) => res.data);
  });
  return (
    <div>
      <a onClick={() => setPostId(-1)} href='#'>
        Back
      </a>
      <br />
      <br />
      {postQuery.isLoading ? (
        "Loading..."
      ) : (
        <>
          {postQuery.data.title}
          <br />
          <br />
          {postQuery.isFetching ? "updating..." : null}
        </>
      )}
    </div>
  );
};
