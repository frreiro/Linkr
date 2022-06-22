import React, { useRef } from 'react';
import { useLocation, useParams } from 'react-router';
import axiosInstance from '../../instances/axiosInstances';
import Main from '../Main';
import FollowButton from '../FollowButton';

export default function UserProfile() {
  const [posts, setPosts] = React.useState([]);
  const userPic = useRef("")
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
      .then((res) => {
        userPic.current = res.data[0].userImage
        res.data.length !== 0 && setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);
  console.log(userPic.current)
  return (
    <>
      <FollowButton />
      <Main pageTitle={{ username: `${state.username}'s posts`, userImage: userPic.current }} posts={posts} />
    </>
  );
}
