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

  useEffect(() => {
    axiosInstance.get(`/hashtags/${hashtag}`, config)
      .then(promise => {
        promise.data.length !== 0 ? setPosts(promise.data) : setResponse(1)
      })
      .catch(e => setResponse(2));
  }, [hashtag])

  return (
    <>
      <Main pageTitle={`# ${hashtag}`} posts={posts} response={response} />
    </>
  )
}
