import React from 'react'
import { useState, useEffect } from 'react';
import { Link as LinkRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// STYLE LIBRARY    
import Avatar from '@mui/material/Avatar'
import { toast } from 'react-toastify';

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

        dispatch(itineraryActions.getOneItinerary(itineraries)) 
            .then(response => setComment(response.comments))
        //eslint-disable-next-line
    }, [!reload])

    async function addComments() {
        const commentData = {
            tinerary: itineraries,
            comment: inputText,
        }
        const res = await dispatch(commentsActions.addComment(commentData))
        setInputText('')

        setReload(!reload)

        
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
        // no recarga pero anda
    }


    async function addCommentsEnterKey(event) {
        if (event.key === 'Enter') {
        const commentData = {
            tinerary: itineraries,
            comment: inputText,
        }
        const res = await dispatch(commentsActions.addComment(commentData))

        setInputText('')

        setReload(!reload)

        
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }
        // no recarga pero anda
    }

    async function modifyComment(event) {
        const commentData = {
            commentId: event.target.id,
            comment: modification,
        }
        console.log(commentData)
        const res = await dispatch(commentsActions.modifyComment(commentData))
        setModification('')

        setReload(!reload)

        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }

    async function removeComment(event) {
        console.log(event.target.id)
        const res = await dispatch(commentsActions.removeComment(event.target.id))
        setReload(!reload)
        // no recarga pero anda

        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }

    console.log(comment)

    return (
        <>
            {loggedUser ? //SI HAY USUARIO CONECTADO
                <div className='commentsContainer'>
                    {comment.map(comment =>
                        <div key={comment._id} className='containerComments'>
                            {comment.userId._id !== loggedUser.id ? 
                                <div className='commentBoxNoUserLog'>
                                    <div>
                                        <Avatar
                                            className='avatarComment'
                                            sx={{ width: 66, height: 66 }}
                                            src={comment.userId.userPhoto} />
                                    </div>

                                    <div className='comment'>
                                        <p className='userNameComment'>{comment.userId.firstName}:</p>
                                        <p className='commentTextNoUser'> {comment.comment}</p>

                                    </div>
                                </div>
                                : 
                                <>
                                    <div className='commentBoxWithBtn' key={comment._id}>
                                        <div >
                                            <Avatar
                                                className='avatarComment'
                                                sx={{ width: 66, height: 66 }}
                                                src={comment.userId.userPhoto} />
                                        </div>

                                        <div className='commentWithButtons'>
                                            
                                            <p className='userNameComment'>{comment.userId.firstName}</p>
                                            <textarea id={comment._id} className='textareaComment' defaultValue={comment.comment} onChange={(event) => setModification(event.target.value)} ></textarea>
                                            <div className='editAndDelete'>
                                                <button className='buttonComment' id={comment._id} onClick={removeComment} >
                                                    🗑
                                                </button>
                                                <button className='buttonComment' id={comment._id} onClick={modifyComment}>
                                                    🖊
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            }
                        </div>
                    )}
                        <div className="sendCommentContainer">
                            <textarea className='textareaSendComment' placeholder="We'll love to know your opinion..." onChange={(event) => setInputText(event.target.value)} onKeyPress={addCommentsEnterKey} value={inputText} ></textarea>
                            <button onClick={addComments} className='buttonComment'>✉</button>
                        </div>
                        <h5 onClick={ScrollToTop} className='callToActionComments'>Feel free to comment!</h5>
                </div>
                : 
                <div className='commentsContainer'>
                    {comment.map(comment =>
                        <div key={comment._id} className='commentBox'>
                            <div className='commentBox'>
                                <div >
                                    <Avatar
                                        className='avatarComment'
                                        sx={{ width: 66, height: 66 }}
                                        src={comment.userId.userPhoto} />
                                </div>

                                <div className='comment'>
                                    <p className='userNameComment'>{comment.userId.firstName}:</p>
                                    <p className='commentTextNoUser'> {comment.comment}</p>
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
