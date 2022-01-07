import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

type PhotoContentProps = {
    image: string;
    roverName: string;
    cameraName: string;
    earthDate: Date;
}

const PhotoComponent = (props: PhotoContentProps) => {
    return (
        <Card sx={{ width: 400, height: 300, marginBottom: 5 }}>
        <CardMedia
            component="img"
            height="194"
            image={props.image}
            alt="space-photo"
        />
        <CardContent>
            <Typography variant="body1" color="text.secondary">
                {props.roverName} rover - {props.cameraName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.earthDate}
            </Typography>
        </CardContent>
    </Card>
    )
}

export default PhotoComponent;
