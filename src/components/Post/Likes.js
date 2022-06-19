import styled from 'styled-components'
import liked from "../../assets/images/redhearth.png"
import unLike from "../../assets/images/hearth.png"
import { useEffect, useState } from 'react'
import axios from 'axios'
import ReactTooltip from 'react-tooltip'
import { useContext } from 'react'
import DataContext from "../context/context";



export default function Like({postId}){
    const [like, setLike] = useState(unLike)
    const [likesCount, setLikesCount] = useState(null);
    const [likedBy, setLikedBy] = useState([])
    const token = localStorage.getItem('token')
    const url = "http://localhost:5000/likes"
    const {data} = useContext(DataContext)
    
    
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    async function getlist(){
        let userName = data.name
        try {
            const promisse = await axios.get(`${url}/${postId}`, config)
            console.log(promisse.data)
            setLikedBy(promisse.data)
            if(promisse.data[0].userName === userName){
                setLike(liked)
            }
        } catch (error) {
        }
    }

    useEffect(async()=>{
        getlist()
    },[])

    async function action(postId){
        console.log(likedBy)
        try {
            const promisse = await axios.post(url, {postId}, config)
            getlist()
            if(like === unLike){
                setLike(liked)
            } else {
                setLike(unLike)
            }
        } catch (error) {
            alert("ocorreu um erro ao curtir o post")       
        }
    }

    return(
        <Container>
            <img data-tip onClick={()=> action(postId)} className='like' src={like}/>
            <p>{likesCount ? `${likesCount} likes` : `0 likes`}</p>
            <ReactTooltip getContent={()=>{
                return 
            }}/>
        </Container>
    )
}

const Container = styled.div`
    img, p{
        position: absolute;
        left: 28px;
        top: 86px;
        width: 25px;
    }
    p{
        top: 108px;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
    }
`