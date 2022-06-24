import React from 'react';
import styled from 'styled-components';
import { GrRefresh } from 'react-icons/gr';

export default function TimelineUpdateButton({
  newPostsCount,
  newPostsArr,
  setNewPostsCount,
  setPosts,
}) {
  const handleUpdatePosts = () => {
    setPosts([...newPostsArr]);
    setNewPostsCount(0);
  };

  return newPostsCount ? (
    <Button onClick={handleUpdatePosts}>
      {newPostsCount} new posts, load more!
      <GrRefresh />
    </Button>
  ) : (
    <></>
  );
}

const Button = styled.button`
  width: 600px;
  height: 60px;
  background-color: #1877f2;
  color: #ffffff;
  font-size: 16px;
  text-align: center;

  svg {
    font-size: 16px;
    color: #ffffff;
  }
`;
