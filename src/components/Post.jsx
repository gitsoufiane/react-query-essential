import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const email = "Sincere@april.biz";
const USER_API = "https://jsonplaceholder.typicode.com/users";
const POST_API = "https://jsonplaceholder.typicode.com/posts";

const fetchUserByEmail = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return axios.get(`${USER_API}?email=${email}`).then((res) => res.data[0]);
};
const fetchPostByUser = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return axios.get(`${POST_API}?userId=${userId}`).then((res) => res.data);
};

const initData = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};
const useUserByEmail = () => {
  return useQuery(["userByEmail"], fetchUserByEmail, {
    initialData: initData, //initla data
  });
};
const usePostByUser = (userId) => {
  return useQuery(["postByUser"], () => fetchPostByUser(userId), {
    enabled: !!userId,
  });
};

export function Post() {
  const userByEmailQuery = useUserByEmail();
  const postByUserQuery = usePostByUser(userByEmailQuery?.data?.id);
  if (userByEmailQuery.isLoading) return "Loading....";
  if (userByEmailQuery.isError || postByUserQuery.isError)
    return (
      <div>
        {userByEmailQuery.error.message}
        {postByUserQuery.error.message}
      </div>
    );
  if (userByEmailQuery.isSuccess || postByUserQuery.isSuccess) {
    return (
      <div>
        <h3>User By Email</h3>
        {JSON.stringify(userByEmailQuery?.data)}
        <bt />
        <bt />
        <h3>Post By User</h3>
        {JSON.stringify(postByUserQuery?.data)}
      </div>
    );
  }
}
