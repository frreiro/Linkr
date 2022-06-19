import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import Header from '../Header';
import Main from '../Main';

export default function Hashtag() {
  const location = useLocation();
  const { hashtag } = location.state;


  const loader = <Oval ariaLabel="loading-indicator" height={50} width={50} strokeWidthSecondary={1} color="#ffffff" secondaryColor="#333333" />
  const errorMessage = <errorCase >An error occured while trying to fetch the posts, please refresh the page</errorCase>
  const notFound = <errorCase >There are no posts yet</errorCase>



  const token = localStorage.getItem('token')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const [posts, setPosts] = useState([])
  const [response, setResponse] = useState(loader)

  useEffect(() => {
    axios.get(`http://localhost:5000/hashtags/${hashtag}`, config)
      .then(promise => {
        promise.data.length !== 0 ? setPosts(promise.data) : setResponse(notFound)
      })
      .catch(e => setResponse(errorMessage));
  }, [hashtag])

  if (posts.length > 0 && Object.keys(posts[0]).length < 0) {
    setResponse(notFound)
  }
  return (
    <>
      <Main pageTitle={`# ${hashtag}`} posts={posts} response={response} />
    </>
  )
}

const errorCase = styled.h1`
    text-align: center;
`
