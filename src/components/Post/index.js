import styled from 'styled-components'
import LinkBanner from '../LinkBanner'


export default function Post(props) {
    return (
        <Banner>
            <ProfilePic src={props.userImage} />
            <Userinfo>
                <h1 className='name'>{props.userName}</h1>
                <p className='description'>{props.postDescription}</p>
            </Userinfo>
            <LinkBanner link={props.linkInfos} />
        </Banner>
    )
}

const Banner = styled.div` 
    box-sizing: border-box;
    width: 611px;
    height: 276px;
    background-color: #171717;
    position: relative;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 19px 23px 20px 86px;
    margin-bottom: 16px;
`
const ProfilePic = styled.div` 
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    overflow: hidden;
    position: absolute;
    top: 17px;
    left: 18px;

    background-image: url(${props => props.src});
    background-size: 80px;
    background-repeat: no-repeat;
    background-position: center;
`
const Userinfo = styled.div` 
    margin-bottom: 9px;
    .name{
        font-weight: 400;
        font-size: 19px;
        color: #fff;
    }

    .description{
        font-weight: 400;
        font-size: 17px;
        color: #B7B7B7;
        margin-top: 7px;
    }
`
