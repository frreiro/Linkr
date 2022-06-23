import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import Main from '../Main';
import axiosInstance from '../../instances/axiosInstances';

export default function Hashtag() {
  const location = useLocation();
  const { hashtag } = location.state;

  const token = localStorage.getItem('token')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const [posts, setPosts] = useState([])
  const [response, setResponse] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const getPosts = () => {
    axiosInstance.get(`/hashtags/${hashtag}?page=${pageNumber}`, config)
      .then(({ data: newPosts }) => {
        checkIsEnded(newPosts);
        checkIfHaveNoPosts(newPosts)
      })
      .catch(e => setResponse(2));
  }

  const validatePosts = (newPosts) => {
    if (pageNumber === 0) setPosts(newPosts)
    else setPosts([...posts, ...newPosts])
  }

  const checkIsEnded = (newPosts) => {
    if (newPosts.length === 0 && pageNumber !== 0) setHasMore(false)
  }

  const checkIfHaveNoPosts = (newPosts) => {
    return newPosts.length !== 0 ? validatePosts(newPosts) : setResponse(1)
  }

  useEffect(() => {
    setPosts([])
    setPageNumber(0);
    setHasMore(true);
    getPosts();
  }, [hashtag])

  useEffect(() => {
    getPosts()
  }, [pageNumber])


  return (
    <>
      <Main pageTitle={`# ${hashtag}`}
        posts={posts}
        response={response}
        setPage={setPageNumber}
        page={pageNumber}
        hasMore={hasMore} />
    </>
  )
}
