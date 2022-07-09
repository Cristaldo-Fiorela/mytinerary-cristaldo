import React from 'react'
import { useState, useEffect } from 'react';
import { Link as LinkRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// MUI
import Avatar from '@mui/material/Avatar'

// STYLES
import '../styles/comments.css'
import commentsActions from '../redux/actions/commentsActions';
import itineraryActions from '../redux/actions/itineraryActions';


function Comments(props) {

    const dispatch = useDispatch()

    const itineraries = props.allProps.allProps._id
    const loggedUser = useSelector(store => store.usersReducer.user)

    // VAR DE ESTATO
    const [inputText, setInputText] = useState('')
    const [modification, setModification] = useState()
    const [reload, setReload] = useState(false)
    const [comment, setComment] = useState([])

    const ScrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left: 0
        })
    }


    useEffect(() => {

        dispatch(itineraryActions.getOneItinerary(itineraries)) //id de itinerario
            .then(response => setComment(response.comments))
        //eslint-disable-next-line
    }, [!reload])

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

    console.log(comment)

    return (
        <>
            {loggedUser ? //SI HAY USUARIO CONECTADO
                <div className='commentsContainer'>
                    {comment.map(comment =>
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
                                    <div className='commentBoxWithBtn' key={comment._id}>
                                        <div>
                                            <Avatar
                                                sx={{ width: 56, height: 56 }}
                                                src={comment.userId.userPhoto} />
                                        </div>

                                        <div className='commentWithButtons'>
                                            <p className='userNameComment'>{comment.userId.firstName} {comment.lastName}</p>
                                            <textarea id={comment._id} className='textareaComment' defaultValue={comment.comment} onChange={(event) => setModification(event.target.value)} ></textarea>
                                            <div className='editAndDelete'>
                                                <button id={comment._id} onClick={removeComment}>Eliminar</button>
                                                <button id={comment._id} onClick={modifyComment}>Modificar</button>
                                            </div>
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
                        <h5 onClick={ScrollToTop} className='callToActionComments'>Feel free to comment!</h5>
                </div>
                : // SI NO HAY USUARIO CONECTADO
                <div className='commentsContainer'>
                    {comment.map(comment =>
                        <div key={comment._id} className='commentBox'>
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
                        </div>
                    )}

                    <LinkRouter to='/signup' className='underlineNone'>
                        <h5 onClick={ScrollToTop} className='callToActionComments'>Feel free to sign up and comment!</h5>
                    </LinkRouter>

                </div>
            }
        </>
    )

}

export default Comments
