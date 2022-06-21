
import styled from 'styled-components';
import MediaQuery from 'react-responsive'
import { Oval } from 'react-loader-spinner';
import { useState } from 'react';

import PublishPost from "../PublishPost";
import Post from '../Post';
import Trending from '../Trending';
import Header from '../Header';


export default function Main({ pageTitle, posts, response: type }) {

  const loader = <Oval ariaLabel="loading-indicator" height={50} width={50} strokeWidthSecondary={1} color="#ffffff" secondaryColor="#333333" />
  const errorMessage = <ErrorCase >An error occured while trying to fetch the posts, please refresh the page</ErrorCase>
  const notFound = <ErrorCase >There are no posts yet</ErrorCase>
  const dataResponse = [loader, notFound, errorMessage]

  const isTimeline = window.location.pathname === "/timeline" ? <PublishPost /> : <></>
  const response = dataResponse[type]

  return (
    <>
      <Header />
      <Container>
        <div>
          <h1 className='title'>{pageTitle}</h1>
          {isTimeline}
          {posts.length > 0
            ? posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  id={post.id}
                  userId={post.userId}
                  userImage={post.userImage}
                  userName={post.userName}
                  postDescription={post.postDescription}
                  linkInfos={post.linkInfo}
                />
              );
            })
            : response}
        </div>
        <MediaQuery minWidth={1000}>
          <Trending />
        </MediaQuery>
      </Container>
    </>
  );
}



const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  .title {
    font-family: 'Oswald';
    font-size: 33px;
    font-weight: 700;
    color: #fff;
    margin-left: 17px;
    margin-top: 19px;
    margin-bottom: 19px;
  }
  

  @media (min-width: 376px) {
    flex-direction: row;

    .title {
      margin-top: 78px;
      margin-bottom: 43px;
      margin-left: 0px;
      width: 611px;
      font-size: 43px;
    }
  }
`;

const ErrorCase = styled.h1`
    text-align: center;
`