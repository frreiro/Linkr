import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

import { Oval } from 'react-loader-spinner';

import Header from '../Header';
import Main from '../Main';

export default function UserProfile() {
  const location = useLocation();
  const { userId } = location.state; // TODO: Pegar esse userId e fazer a requisição dos posts do usuário

  const loader = (
    <Oval
      ariaLabel="loading-indicator"
      height={50}
      width={50}
      strokeWidthSecondary={1}
      color="#ffffff"
      secondaryColor="#333333"
    />
  );

  const notFoundMessage = <h1 className="response">There are no posts yet.</h1>;

  const errorMessage = (
    <h1 className="response">
      An error occured while trying to fetch the posts, please refresh the page.
    </h1>
  );

  const [posts, setPosts] = React.useState([]);
  const [response, setResponse] = React.useState(loader);

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    const URL = '';

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(URL, config)
      .then((res) => {
        res.data.length !== 0
          ? setPosts(res.data)
          : setResponse(notFoundMessage);
      })
      .catch((e) => setResponse(errorMessage));
  }, []);

  return (
    <>
      <Header />
      <Main pageTitle={posts.username} posts={posts} response={response} />
    </>
  );
}
