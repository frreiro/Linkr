import React from 'react';
import { useLocation, useParams } from 'react-router';
import axiosInstance from '../../instances/axiosInstances';
import Main from '../Main';

export default function UserProfile() {
  const [posts, setPosts] = React.useState([]);
  const { userId } = useParams();
  const { state } = useLocation();

  React.useEffect(() => {
    const usertoken = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    };

    axiosInstance
      .get(`/users/${userId}`, config)
      .then((res) => {
        res.data.length !== 0 && setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      <Main pageTitle={state.username} posts={posts} />
    </>
  );
}
