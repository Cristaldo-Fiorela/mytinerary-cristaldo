import React from 'react'
import { useState } from 'react';
import { Link as LinkRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// MUI
import Avatar from '@mui/material/Avatar'

// STYLES
import '../styles/comments.css'
import commentsActions from '../redux/actions/commentsActions';



function Comments(props) {
    
    const dispatch = useDispatch()
    const arrayComments = props.comments.comments.comments
    const itineraries = props.comments._id
    const loggedUser = useSelector(store => store.usersReducer.user)

    const [inputText, setInputText] = useState('')
    const [modification, setModification] = useState()
    const [reload, setReload] = useState(false)

    const ScrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left: 0
        })
    }

    async function addComments() {
        const commentData = {
            tinerary: itineraries,
            comment: inputText,
        }
        //console.log(commentData)
        await dispatch(commentsActions.addComment(commentData))
        setInputText('')

        setReload(!reload)
        // no recarga pero anda
    }
    
    async function modifyComment(event) {
        const commentData = {
            commentId: event.target.id,
            comment: modification,
        }
        console.log(commentData)
        await dispatch(commentsActions.modifyComment(commentData))
        setModification('')

        setReload(!reload)
    }

    async function removeComment(event) {
        console.log(event.target.id)
        await dispatch(commentsActions.removeComment(event.target.id))
        setReload(!reload) 
        // no recarga pero anda
    }


    return (
        <>
            <div className='commentsContainer'>
                {arrayComments.map(comment =>
                    <div key={comment._id} className='containerComments'>
                        {comment.userId._id !== loggedUser.id ?
                            <div className='commentBox'>
                                <div>
                                    <Avatar
                                        sx={{ width: 56, height: 56 }}
                                        src={comment.userId.userPhoto} />
                                </div>

                                <div className='comment'>
                                    <p className='userNameComment'>{comment.userId.firstName}</p>
                                    <p> {comment.comment}</p>
                                </div>
                            </div>
                            :
                            <>
                                <div className='commentBox' key={comment._id}>
                                    <div>
                                        <Avatar
                                            sx={{ width: 56, height: 56 }}
                                            src={comment.userId.userPhoto} />
                                    </div>

                                    <div className='comment'>
                                        <p className='userNameComment'>{comment.userId.firstName} {comment.userId.lastName}</p>
                                        <p> {comment.comment}</p>
                                    </div>
                                </div>

                                <div>
                                    <textarea value={ modification} onChange={(event) => setModification(event.target.value)}></textarea>
                                    <div className='editAndDelete'>
                                        <button id={comment._id} onClick={removeComment}>Eliminar</button>
                                        <button id={comment._id} onClick={modifyComment}>Modificar</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                )}
                <div className="card cardComments">
                    <div className="card-header cardHeaderNew">
                        DEJANOS TU COMENTARIO
                    </div>
                    <div className="card-body ">
                        <textarea id="nuevoComentario" placeholder='Ingresa aqui tu comentario...' onChange={(event) => setInputText(event.target.value)} value={inputText} className="card-text textComments" ></textarea>
                        <button onClick={addComments} className="btn btn-primary btnComments">Send</button>
                    </div>
                </div>
                <LinkRouter to='/signup' className='underlineNone'>
                    <h5 onClick={ScrollToTop} className='callToActionComments'>Feel free to sign up and comment!</h5>
                </LinkRouter>

            </div>

        </>
    )

}

export default Comments
