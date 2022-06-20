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
            for(let i = 0; i<promisse.data.length; i ++){
                if(promisse.data[i] === userName){
                    setLike(liked)
                }
            }
            setLikedBy(filter(promisse.data))
        } catch (error) {
            alert("ocorreu um erro")
        }
    }

    useEffect(async()=>{
        getlist()
    },[])

    function filter(names){
        for(let i = 0; i<names.length; i++){
            if(names[i]===data.name){
                names.unshift("você")
            }
        }
        if(names.length === 0) return null
        else if (names.length ===1) return `${names[0]} curtiu`
        else if (names.length === 2) return `${names[0]} e ${names[1]} curtiram`
        else if (names.length > 2) return `${names[0]} e ${names[1]} e outros ${names.length - 2} curtiram`
    }

    async function action(postId){
        // console.log(likedBy)
        try {
            const promisse = await axios.post(url, {postId}, config)
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
            <img data-tip="" data-for={String(postId)} onClick={()=> action(postId)} className='like' src={like}/>
            <p>{likesCount ? `${likesCount} likes` : `0 likes`}</p>
            <ReactTooltip
              id={String(postId)}
              getContent={() => {
                return null
              }}
            >
              {likedBy && <span>{likedBy}</span>}
            </ReactTooltip>
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