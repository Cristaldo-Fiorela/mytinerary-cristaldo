import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function DisplayCardCities(props) {
    return (
        <>
        {props.allCities.map((city, index) => 
        <Card 
        sx={{ maxWidth: 345 }}
        key={index} 
        >
            <CardActionArea >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {city.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {city.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        )}
        </>
    ); 
}

export default DisplayCardCities;