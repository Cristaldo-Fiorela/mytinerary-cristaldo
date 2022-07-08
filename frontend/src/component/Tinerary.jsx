import React, { useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Activities from './Activities'
import FavoriteIcon from '@mui/icons-material/Favorite'

import '../styles/tinerary.css'
import itineraryActions from '../redux/actions/itineraryActions'
import { useDispatch, useSelector } from 'react-redux'
import Comments from './Comments'
import CommentsWithOutUser from './CommentsWithOutLoggedUser'



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function TineraryCard(props) {

    const dispatch = useDispatch()
    const loggedUser = useSelector(store => store.usersReducer.user)

    // INITIAL AND NEW STATES VAR
    const [expanded, setExpanded] = React.useState(false);
    const [reload, setReload] = React.useState(false)
    const [likes, setLikes] = React.useState(props.like)
    console.log(likes)
    
    const handleExpandClick = () => {
        setExpanded(!expanded)
    };

    useEffect(() => { 
        dispatch(itineraryActions.getOneItinerary(props._id))
            .then(res => setLikes(res.like))
        // eslint-disable-next-line
    }, [!reload])


    const favoriteAction = async (event) => {
        event.preventDefault()
        await dispatch(itineraryActions.likeAndDislikes(props._id))
        //console.log(res)
        setReload(!reload)
    }   

    // CARD //
    return (
        <>
            <div className='conteinerTinerary' key={props._id}>

                <div className='cardTinerary'>
                    <div className='tineraryTitle'>
                        <h3 className='titleBox'>{props.name}</h3>
                    </div>
                    <div>
                        <div className='userTineraryCreator'>
                            <Avatar
                                alt="Remy Sharp"
                                src={process.env.PUBLIC_URL + (props.userPhoto)}
                                sx={{ height: 200, width: 200 }}
                            />
                            <p> | {props.userName} | </p>
                        </div>
                        <div className='tineraryInfo'>
                            <p>price {props.price}</p>
                            <p>{props.duration}⏲</p>

                            {loggedUser ?
                            <div className='favoriteButton'>
                                <IconButton aria-label="add to favorites" onClick={favoriteAction}>
                                    {likes.includes(loggedUser.id) ?
                                        <FavoriteIcon fontSize='large' sx={{color: "#A62D43"}} /> 
                                        :
                                        <FavoriteIcon fontSize='large' />
                                    }
                                </IconButton>
                                    <p>{likes.length}</p>
                            </div>
                            :
                            <div className='favoriteButton'>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon  fontSize='large' />
                                </IconButton>
                                    <p>{likes.length}</p>
                            </div>
                            }
                            
                        </div>

                        <div className='tineraryHashtags' >
                            <p className='hashtag'>{props.hashtags[0]}</p>
                            <p className='hashtag'>{props.hashtags[1]}</p>
                            <p className='hashtag'>{props.hashtags[2]}</p>
                        </div>
                    </div>

                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            className='expandButton'
                        >
                            <ExpandMoreIcon fontSize='large' sx={{color: "#A62D43"}}/>
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                                <div className='expandContainer'>
                                    <h4 className='sectionTitle'>Activities</h4>
                                    <div className='activitiesContainer'>
                                        {props.activities.length > 0 ?
                                            < Activities activities={props.activities} />
                                            :
                                            <h5 className='comingSoon'>
                                            Coming soon~
                                            </h5>
                                        }
                                    </div>
                                    <h4 className='sectionTitle'>Comments</h4>
                                    {!loggedUser ?
                                    < CommentsWithOutUser comments={props} />
                                    :
                                    < Comments comments={props} />
                                    }
                                </div>
                        </CardContent>
                    </Collapse>
                </div>

            </div>
        </>
    )
}

export default TineraryCard
