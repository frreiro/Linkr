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
    width: 278px;
    height: 115px;
    background-color: #171717;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    position: relative;

    div{
        display: flex;
        flex-direction: column;
        padding: 24px 160px 23px 19px;
        justify-content: space-between;
        overflow: hidden;
        h1{ 
            word-break: break-word;
            font-size: 11px;
            font-weight: 400;
            color: #CECECE;
        }

        h2{
            font-size: 9px;
            font-weight: 400;
            color: #9B9595;
        }
        
        p{
            font-size: 10px;
            font-weight: 400;
            color: #CECECE;
        }

    }
    
    img{
        width: 95px;
        height: 115px;
        border-radius: 0px 11px 11px 0px;
        position: absolute;
        position: absolute;
        margin-top: auto;
        margin-bottom: auto;
        top: 0;
        bottom: 0;
        right: 0;
    }

    @media (min-width: 376px){

        width: 503px;
        height: 155px;

        div{
            h1{
                font-size: 16px; 
            }
            h2{
                font-size: 11px;
            }
            p{
                font-size: 11px; 
            }
        }
        img{
            width: 155px;
            height: 100%;
        }
    }
`