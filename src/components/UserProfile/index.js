import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import axiosInstance from '../../instances/axiosInstances';
import Main from '../Main';
import FollowButton from '../FollowButton';

export default function UserProfile() {
  const userPic = useRef("")
  const { userId } = useParams();
  const { state } = useLocation();

  const [posts, setPosts] = useState([])
  const [response, setResponse] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const usertoken = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${usertoken}`,
    },
  };

  const getUserPosts = () => {
    axiosInstance.get(`/posts/${userId}?page=${pageNumber}`, config)
      .then(({ data: newPosts }) => {
        checkIsEnded(newPosts);
        checkIfHaveNoPosts(newPosts)
        userPic.current = newPosts[0].userImage
      })
      .catch((err) => console.log(err));
  }


  const validatePosts = (newPosts) => {
    if (pageNumber === 0) setPosts(newPosts)
    else setPosts([...posts, ...newPosts])
  }

  const checkIsEnded = (newPosts) => {
    if (newPosts.length === 0 && pageNumber !== 0) return setHasMore(false)
  }

  const checkIfHaveNoPosts = (newPosts) => {
    return newPosts.length !== 0 ? validatePosts(newPosts) : setResponse(1)
  }

  useEffect(() => {
    setPosts([])
    setPageNumber(0);
    setHasMore(true);
    getUserPosts();
  }, [userId])

  useEffect(getUserPosts, [pageNumber]);


  return (
    <>
      <FollowButton />
      <Main pageTitle={{ username: `${state.username}'s posts`, userImage: userPic.current }}
        posts={posts}
        response={response}
        setPage={setPageNumber}
        page={pageNumber}
        hasMore={hasMore} />
    </>
  );
}
