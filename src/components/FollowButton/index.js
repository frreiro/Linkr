import React from 'react';
import axiosInstance from '../../instances/axiosInstances';
import { useParams } from 'react-router';
import styled from 'styled-components';
import DataContext from '../context/context';
import Swal from 'sweetalert2';

export default function FollowButton() {
  const { userId } = useParams();
  const { data } = React.useContext(DataContext);
  const currentUserId = data.id;

  const [buttonShouldAppear, setButtonShouldAppear] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const getReqConfig = () => {
    const followedUserId = Number(userId);
    const data = { currentUserId, followedUserId };

    const usertoken = localStorage.getItem('token');

    const config = {
      headers: {
        authorization: `Bearer ${usertoken}`,
      },
      data,
    };

    return { config, data };
  };

  const handleFollowUnfolow = () => {
    setIsLoading(true);

    const { config, data } = getReqConfig();

    const promise = isFollowing
      ? axiosInstance.delete('/follow', config)
      : axiosInstance.post('/follow', data, config);

    promise
      .then(() => {
        setIsFollowing(!isFollowing);
      })
      .catch(() => {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu um erro ao tentar seguir ou deixar de seguir o usuário. Recarregue a página e tente novamente!',
          confirmButtonColor: '#000000',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    setButtonShouldAppear(Number(userId) !== currentUserId);

    const { config } = getReqConfig();

    setIsLoading(true);

    axiosInstance
      .get('/follow', config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setIsFollowing(res.data); // TRUE ou FALSE
      })
      .catch((err) => console.log('deu ruim no useEffect', err))
      .finally(() => setIsLoading(false));
  }, [userId, currentUserId]);

  return (
    buttonShouldAppear && (
      <Button
        onClick={handleFollowUnfolow}
        disabled={isLoading}
        className={isFollowing ? 'unfollow' : 'follow'}>
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

  &.unfollow {
    background-color: #ffffff;
    color: #1877f2;
  }

  &:disabled {
    filter: opacity(40%);
  }
`;
