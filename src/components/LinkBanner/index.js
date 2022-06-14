import styled from 'styled-components'


export default function LinkBanner() {
    return (
        <Banner onClick={() => window.open('https://miro.medium.com/fit/c/294/294/0*k9CL2yoHU6ELTkmi.png', '_blank')}>
            <div>
                <h1>Como aplicar o Material UI em um projeto React</h1>
                <h2>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</h2>
                <p>https://medium.com/@pshrmn/a-simple-react-router</p>
            </div>
            <img src='https://miro.medium.com/fit/c/294/294/0*k9CL2yoHU6ELTkmi.png' />
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