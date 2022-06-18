
import styled from 'styled-components';
import PublishPost from "../PublishPost";
import Post from '../Post';

export default function Main({ pageTitle, posts, response }) {
  const isTimeline = window.location.pathname === "/timeline" ? <PublishPost /> : <></>

  return (
    <>
      <Container>
        <h1 className='title'>{pageTitle}</h1>
        {isTimeline}
        <div>
          {posts.length > 0
            ? posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  userImage={post.userImage}
                  userName={post.userName}
                  postDescription={post.postDescription}
                  linkInfos={post.linkInfo}
                />
              );
            })
            : response}
        </div>
      </Container>
    </>
  );
}



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: calc(100vw - 17px);
    font-family: 'Oswald';
    font-size: 33px;
    font-weight: 700;
    color: #fff;
    margin-top: 19px;
    margin-left: 17px;
    margin-bottom: 19px;
  }


  @media (min-width: 376px) {
    .title {
      margin-top: 78px;
      margin-bottom: 43px;
      width: 611px;
      font-size: 43px;
    }
  }
`;
