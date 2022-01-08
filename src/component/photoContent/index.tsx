import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CheckIcon from '@mui/icons-material/Check';
import './photoContent.css';

type PhotoContentProps = {
    key: number;
    image: string;
    roverName: string;
    cameraName: string;
    earthDate: Date;
    photoId: number;
}

const PhotoComponent = (props: PhotoContentProps) => {
    let [numLike, setNumLike] =  useState(0);
    const [liked, setLiked] = useState(false);

    // Fetch rover info with given rover name
    useEffect(() => {
        if (!window.localStorage.getItem(`${props.photoId}_numLikes`)) {
            return;
        }
        else {
            setNumLike(Number(window.localStorage.getItem(`${props.photoId}_numLikes`)));
        }
    }, []);

    function handleLiked() {
        setLiked(!liked);

        if (!liked) {
            const incerasedLiked = numLike+1;
            localStorage.setItem(`${props.photoId}_numLikes`, incerasedLiked.toString());
            setNumLike(incerasedLiked);
        }
        else {
            const decreasedLiked = numLike-1;
            localStorage.setItem(`${props.photoId}_numLikes`, decreasedLiked.toString());
            setNumLike(decreasedLiked);
        }
    }

    function showLikeMessage() {
        if (liked) {
            return "Liked";
        }
        else {
            return "Like"
        }
    }

    return (
        <Card className="card-content">
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
                <Typography className="earth-date-info" variant="body2" color="text.secondary">
                    {props.earthDate}
                </Typography>
            </CardContent>
            <Button className="like-button" variant="contained" onClick={handleLiked}>
                {liked === false ? <ThumbUpIcon className="thumb-icon" /> : <CheckIcon className="check-icon" />}
                {showLikeMessage()}:{numLike}
            </Button>
        </Card>
    )
}

export default PhotoComponent;
