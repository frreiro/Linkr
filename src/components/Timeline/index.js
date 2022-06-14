import styled from "styled-components"
import { Header } from "../Header";
import Post from "../Post";

const posts = [{
    userImage: 'https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221?dimensions=771x420&no_crop=true',
    userName: 'Gabriel Pedro',
    postDescription: 'Foi massa, muito lagal, deem uma olhada nesse link aqui é top!',
    linkInfos: {
        title: 'Como comer arroz e feijão com uma só garfada, top',
        description: 'A moda agora é comer arroz feijão e bife mas tudo de uma vez',
        url: 'https://www.google.com.br',
        image: 'https://miro.medium.com/fit/c/294/294/0*k9CL2yoHU6ELTkmi.png'
    }
}]

export default function Timeline() {
    //TODO: requisição com os posts

    return (
        <>
            <Header />
            <Container>
                <div className="timeline">
                    <h1>timeline</h1>
                </div>
                {posts.map((post) => {
                    return (
                        <Post
                            userImage={post.userImage}
                            userName={post.userName}
                            postDescription={post.postDescription}
                            linkInfos={post.linkInfos}
                        />
                    )
                })}
            </Container>
        </>

    )
}


const Container = styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 78px;

            .timeline{
                width: 611px;
            font-family: 'Oswald';
            font-size: 43px;
            font-weight: 700;
            color: #fff;
            text-align: left;
            margin-bottom: 43px;
    }
            `
