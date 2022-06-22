import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import styled from 'styled-components';

export default function Delete(){
    const [open, setOpen] = React.useState(false);
    console.log(open);
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
        return(
            <div className='modal'>
                <div className='background'></div>
                <div className='box'>
                    <h1>Are you sure you want to delete this post?</h1>
                    <div className='buttons'>
                        <button>No, go back</button>
                        <button>Yes, delete it</button>
                    </div>
                </div>
            </div>
        )
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