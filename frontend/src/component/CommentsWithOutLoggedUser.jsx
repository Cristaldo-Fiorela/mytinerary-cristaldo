import React from 'react'
import { Link as LinkRouter } from "react-router-dom";
import Avatar from '@mui/material/Avatar'

import '../styles/comments.css'



function CommentsWithOutUser(props) {

    const arrayComments = props.comments.comments.comments

    const ScrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left: 0
        })
    }


    return (
        <>
            <div className='commentsContainer'>
                {arrayComments.map(comment =>
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

        </>
    )

}

export default CommentsWithOutUser

