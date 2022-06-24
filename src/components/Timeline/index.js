import { useEffect, useState } from 'react';
import Main from '../Main';
import axiosInstance from '../../instances/axiosInstances';
<<<<<<< HEAD
import SearchBar from '../Header/SearchBar';
=======
import useInterval from 'use-interval';
>>>>>>> 7b273efbfeec2cab44f88af30ce1221e07abcf31

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [newPostsArr, setNewPostsArr] = useState([]);
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [response, setResponse] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useInterval(() => {
    axiosInstance
      .get(`/timeline?page=${pageNumber}`, config)
      .then(({ data: newPosts }) => {
        if (newPosts.length === 0 && pageNumber !== 0) setHasMore(false);
        if (newPosts.length !== 0 && newPosts.length !== posts.length) {
          let dif = newPosts.length - posts.length;
          if (dif < 0) dif = 0;
          setNewPostsCount(dif);
          setNewPostsArr([...newPosts]);
        }
      })
      .catch((e) => {
        if (
          e.response.status === 404 &&
          e.response.data === 'No followers found'
        ) {
          setResponse(3);
        } else setResponse(2);
      });
  }, 15000);

  useEffect(() => {
    axiosInstance
      .get(`/timeline?page=${pageNumber}`, config)
      .then(({ data: newPosts }) => {
        if (newPosts.length === 0 && pageNumber !== 0) setHasMore(false);
        newPosts.length !== 0
          ? setPosts([...posts, ...newPosts])
          : setResponse(1);
      })
      .catch((e) => {
        if (
          e.response.status === 404 &&
          e.response.data === 'No followers found'
        ) {
          setResponse(3);
        } else setResponse(2);
      });
  }, [pageNumber]);

  return (
    <>
      <Main
        pageTitle={'timeline'}
        posts={posts}
        response={response}
        setPage={setPageNumber}
        page={pageNumber}
        hasMore={hasMore}
        newPostsCount={newPostsCount}
        setNewPostsCount={setNewPostsCount}
        newPostsArr={newPostsArr}
        setPosts={setPosts}
      />
    </>
  );
}
