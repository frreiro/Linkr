import styled from 'styled-components'
import liked from "../../assets/images/redhearth.png"
import unLike from "../../assets/images/hearth.png"
import { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { useContext } from 'react'
import DataContext from "../context/context";
import axiosInstance from '../../instances/axiosInstances'



export default function Like({ postId, userName }) {
    const [like, setLike] = useState(unLike)
    const [likesCount, setLikesCount] = useState(null);
    const [likedBy, setLikedBy] = useState([])
    const token = localStorage.getItem('token')
    const url = "/likes"

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    async function getlist() {
        let aux = false
        try {
            const promisse = await axiosInstance.get(`${url}/${postId}`, config)
            setLikesCount(promisse.data.length)
            for (let i = 0; i < promisse.data.length; i++) {
                if (promisse.data[i] === userName) {
                    promisse.data.splice(i, 1)
                    aux = true
                    setLike(liked)
                }
            }
            setLikedBy(filter(promisse.data, aux))
        } catch (error) {
            alert("ocorreu um erro")
        }
    }

    useEffect(() => {
        getlist()
    }, [like])

    function filter(names, aux) {
        if (names.length === 0) return null
        else if (aux && names.length === 0) return `você curtiu`
        else if (aux && names.length === 1) return `você e ${names[0]} curtiram`
        else if (aux && names.length === 2) return `você, ${names[0]} e outros ${names.length - 1} curtiram`
        else if (names.length === 1) return `${names[0]} curtiu`
        else if (names.length === 2) return `${names[0]} e ${names[1]} curtiram`
        else if (names.length > 2) return `${names[0]} e ${names[1]} e outros ${names.length - 1} curtiram`
    }

    async function action(postId) {
        try {
            const promisse = await axiosInstance.post(url, { postId }, config)
            if (like === unLike) {
                setLike(liked)
            } else {
                setLike(unLike)
            }
            ReactTooltip.rebuild();
        } catch (error) {
            alert("ocorreu um erro ao curtir o post")
        }
    }

    return (
        <Container>
            <img data-tip="" data-for={String(postId)} onClick={() => action(postId)} className='like' src={like} />
            <p>{likesCount ? `${likesCount} likes` : `0 likes`}</p>
            <ReactTooltip
                type="light"
                place="bottom"
                id={String(postId)}
                getContent={() => {
                    return null
                }}
            >
                {<span>{likedBy}</span>}
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
        margin-top: 10px;
        top: 108px;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        width: 100%;
    }
`