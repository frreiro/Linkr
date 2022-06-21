import React from 'react';
import axiosInstance from '../../instances/axiosInstances';
import { useParams } from 'react-router';
import styled from 'styled-components';
import DataContext from '../context/context';

export default function FollowButton() {
  const { userId } = useParams();
  const { data } = React.useContext(DataContext);
  const currentUserId = data.id;

  const [buttonShouldAppear, setButtonShouldAppear] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFollowUnfolow = () => {
    setIsLoading(true);

    const usertoken = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    };

    const data = { currentUserId, followedUserId: userId };

    let promise;

    if (isFollowing) {
      promise = axiosInstance.delete('/follow', data, config);
    } else {
      promise = axiosInstance.post('/follow', data, config);
    }

    promise
      .then(() => {
        setIsFollowing(!isFollowing);
      })
      .catch((err) => {
        console.log(err);
        alert('deu ruim na hora de seguir/deixar de seguir fulano');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    setButtonShouldAppear(Number(userId) !== currentUserId);
  }, [userId, currentUserId]);

  return (
    buttonShouldAppear && (
      <Button onClick={handleFollowUnfolow} disabled={isLoading}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    )
  );
}

const Button = styled.button`
  width: 112px;
  height: 30px;
  background-color: #1877f2;
  border-radius: 5px;
  font-weight: 700;
  color: #ffffff;
  position: absolute;
  top: 150px;
  right: 30%;

  &:disabled {
    filter: opacity(40%);
  }
`;
