import styled from 'styled-components'
import LinkBanner from '../LinkBanner'


export default function Post() {
    return (
        <Banner>
            <ProfilePic src='https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221?dimensions=771x420&no_crop=true' />
            <Userinfo>
                <h1 className='name'>Juvenal Juvêncio</h1>
                <p className='description'>Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</p>
            </Userinfo>
            <LinkBanner />
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
