
import styled from 'styled-components';
import MediaQuery from 'react-responsive'
import { Oval } from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PublishPost from "../PublishPost";
import Post from '../Post';
import Trending from '../Trending';
import Header from '../Header';


export default function Main({ pageTitle, posts, response: type, setPage, page, hasMore }) {

  const loader = <Oval ariaLabel="loading-indicator" height={50} width={50} strokeWidthSecondary={1} color="#ffffff" secondaryColor="#333333" />
  const errorMessage = <ErrorCase >An error occured while trying to fetch the posts, please refresh the page</ErrorCase>
  const notFound = <ErrorCase >No posts found from your friends</ErrorCase>
  const endMessage = <ErrorCase >You've seen all</ErrorCase>
  const noFollowers = <ErrorCase >You don't follow anyone yet. Search for new friends!</ErrorCase>

  const dataResponse = [loader, notFound, errorMessage, noFollowers]
  const response = dataResponse[type]

  const isTimeline = window.location.pathname === "/timeline" ? true : false


  const renderPost = (post) => {
    return <Post
      key={post.id}
      id={post.id}
      userId={post.userId}
      userImage={post.userImage}
      userName={post.userName}
      postDescription={post.postDescription}
      linkInfos={post.linkInfo}
    />
  }

  const timelineRender = () => {
    return (
      <InfiniteScroll
        dataLength={posts.length}
        loader={loader}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        endMessage={endMessage}>
        <h1 className='title'>{pageTitle}</h1>
        <PublishPost />
        {posts.length > 0 ? posts.map((post) => { return renderPost(post) }) : response}
      </InfiniteScroll>
    )
  }


  //TODO: remover mais tarde e usar tudo com o scroll infinito
  const mainRender = () => {
    return (
      <div>
        <h1 className='title'>{pageTitle}</h1>
        {posts.length > 0 ? posts.map((post) => { return renderPost(post) }) : response}
      </div>
    )
  }

  return (
    <>
      <Header />
      <Container>
        {isTimeline ? timelineRender() : mainRender()}
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