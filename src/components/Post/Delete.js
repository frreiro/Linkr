import React from 'react';

export default function Delete(){

    function DeleteButton(){
        return(
            <img src="../../assets/images/trash.svg" />
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