import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Activities from './Activities';

import '../styles/tinerary.css'



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
    //console.log(props)
    console.log(props.activities)

    // EXPAND //
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                            <p>likes {props.like}</p>
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
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {props.activities.length > 0 ?
                            < Activities activities={props.activities}/>
                            :
                            <h5 className='comingSoon'>
                                Coming soon~
                            </h5> 
                            }
                        </CardContent>
                    </Collapse>
                </div>

            </div>
        </>
    )
}

export default TineraryCard

