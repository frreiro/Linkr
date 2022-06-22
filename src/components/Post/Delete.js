import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import styled from 'styled-components';

export default function Delete(){
    const [open, setOpen] = React.useState(false);
    function DeleteButton(){
        return(
            <DeleteIcon>
                <IconContext.Provider value={{ color: "white", size: "20px"}}>
                    <AiFillDelete onClick={() => setOpen(true)}/>
                </IconContext.Provider>
            </DeleteIcon>
        )
    }
    function Modal(){
        if(open){
            return(
                <ModalStyle>
                    <div className='box'>
                        <h1>Are you sure you want to delete this post?</h1>
                        <div className='buttons'>
                            <button>No, go back</button>
                            <button>Yes, delete it</button>
                        </div>
                    </div>
                    <div className='background'></div>
                </ModalStyle>
            )
        } else {
            return(
                <></>
            )
        }
    }
    return(
        <>
            <DeleteButton />
            <Modal />
        </>
    )
}

const DeleteIcon = styled.div`
    position: absolute;
    right: 8px;
    top: 13px;
`;

const ModalStyle = styled.div`
    .background{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.2);
        z-index: 1;
    }
    .box{
        width: 597px;
        height: 262px;
        margin: auto auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        background: #333333;
        border-radius: 50px;
        z-index: 10;
    }
    .box h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;
    }
`;