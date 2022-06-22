import React from 'react';
import { useLocation, useParams } from 'react-router';
import axiosInstance from '../../instances/axiosInstances';
import Main from '../Main';
import FollowButton from '../FollowButton';

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
      .get(`/posts/${userId}`, config)
      // .get(`/timeline`, config) // só pra fazer funfar aqui e eu testar o botão
      .then((res) => {
        res.data.length !== 0 && setPosts(res.data);
        console.log(posts)
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      <FollowButton />
      <Main pageTitle={state.username} posts={posts} />
    </>
  );
}
