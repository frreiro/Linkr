import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import styled from 'styled-components';
import axiosInstance from '../../instances/axiosInstances';

export default function Delete({ token, id }){
    const [open, setOpen] = React.useState(false);
    const [disable, setDisable] = React.useState(false)
    function sendDelete(){
        setDisable(true);
        const userData = {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        };
        let promisse = axiosInstance.get(`/delete/${id}`, userData);
        promisse.then(()=> setOpen(false));
        promisse.catch(()=> {alert("Houve um problema ao excluir o post")
        setOpen(false);
    })
    }
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
                            <button className='cancel' disabled={disable} onClick={()=> setOpen(false)}>No, go back</button>
                            <button className='ok' disabled={disable} onClick={() => sendDelete()}>Yes, delete it</button>
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
        top: calc(50% - 131px);
        left: calc(50% - 298.5px);
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
        width: 340px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;
        margin-bottom: 40px;
    }
    .cancel{
        width: 134px;
        height: 37px;
        background: #FFFFFF;
        border-radius: 5px;
        border: 0px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        color: #1877F2;
        margin-right: 15px;
    }
    .ok{
        width: 134px;
        height: 37px;
        background: #1877F2;
        border-radius: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        color: #FFFFFF;
        margin-left: 15px;
    }
    .buttons{
        display: flex;
        justify-content: center;
    }

`;