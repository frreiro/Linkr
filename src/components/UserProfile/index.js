import React from 'react';
import { useLocation } from 'react-router';


import Main from '../Main';
import axiosInstance from '../../instances/axiosInstances';

export default function UserProfile() {
  const location = useLocation();
  const { userId } = location.state; // TODO: Pegar esse userId e fazer a requisição dos posts do usuário

  const [posts, setPosts] = React.useState([]);
  const [response, setResponse] = React.useState(0);

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    const URL = '';

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(URL, config)
      .then((res) => {
        res.data.length !== 0
          ? setPosts(res.data)
          : setResponse(1);
      })
      .catch((e) => setResponse(2));
  }, []);

  return (
    <>
      <Main pageTitle={posts.username} posts={posts} response={response} />
    </>
  );
}
