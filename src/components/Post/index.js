import styled from 'styled-components';
import LinkBanner from '../LinkBanner';

export default function Post(props) {
  return (
    <Banner>
      <ProfilePic src={props.userImage} />
      <Userinfo>
        <h1 className="name">{props.userName}</h1>
        <p className="description">{props.postDescription}</p>
      </Userinfo>
      <LinkBanner link={props.linkInfos} />
    </Banner>
  );
}

const Banner = styled.div`
  width: 100vw;
  height: 232px;
  background-color: #171717;
  position: relative;
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 19px 23px 20px 69px;
  margin-bottom: 16px;

  @media (min-width: 376px) {
    width: 611px;
    height: 276px;
    border-radius: 16px;
    padding: 19px 23px 20px 86px;
  }
`;
const ProfilePic = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 26.5px;
  overflow: hidden;
  position: absolute;
  top: 17px;
  left: 18px;

  @media (min-width: 376px) {
    width: 50px;
    height: 50px;
  }

  background-image: url(${(props) => props.src});
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: center;
`;
const Userinfo = styled.div`
  margin-bottom: 9px;
  .name {
    font-weight: 400;
    font-size: 17px;
    color: #fff;
  }

  .description {
    font-weight: 400;
    font-size: 15px;
    color: #b7b7b7;
    margin-top: 7px;
  }

  @media (min-width: 376px) {
    .name {
      font-size: 19px;
    }
    .description {
      font-size: 17px;
    }
  }
`;
