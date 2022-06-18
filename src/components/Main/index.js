import Post from '../Post';

export default function Main({ pageTitle, posts, response }) {
  return (
    <>
      <div>
        <h1>{pageTitle}</h1>

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
      </div>
    </>
  );
}
