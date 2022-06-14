import styled from 'styled-components'


export default function LinkBanner(props) {
    return (
        <Banner onClick={() => window.open(props.link.url, '_blank')}>
            <div>
                <h1>{props.link.title}</h1>
                <h2>{props.link.description}</h2>
                <p>{props.link.url}</p>
            </div>
            <img src={props.link.image} alt='site' />
        </Banner>
    )
}

const Banner = styled.div`
    cursor: pointer;
    width: 503px;
    height: 155px;
    background-color: #171717;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;

    div{
        display: flex;
        flex-direction: column;
        padding: 24px 27px 23px 19px;
        justify-content: space-between;

        h1{
            font-size: 16px;
            font-weight: 400;
            color: #CECECE;
        }

        h2{
            font-size: 11px;
            font-weight: 400;
            color: #9B9595;
        }
        
        p{
            font-size: 11px;
            font-weight: 400;
            color: #CECECE;
        }
    }
    
    img{
        width: 154px;
        height: 155px;
        border-radius: 0px 11px 11px 0px;
    }
`