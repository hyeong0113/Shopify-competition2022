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

    /**
     * If the card has saved number of likes, call the information from local storage.
     * If note, return nothing.
     */
    useEffect(() => {
        if (!window.localStorage.getItem(`${props.photoId}_numLikes`)) {
            return;
        }
        else {
            setNumLike(Number(window.localStorage.getItem(`${props.photoId}_numLikes`)));
        }
    }, []);

    /**
     * Handle number of likes
     */
    function handleNumLike() {
        setLiked(!liked);
        if (!liked) {
            // If user likes, increase number of likes by 1.
            handleNumLikeHelper(1);
        }
        else {
            // If user does not like, decerase number of likes by 1.
            handleNumLikeHelper(-1);
        }
    }

    /**
     * Helper function of handleNumLike()
     * @param signLike Value is +1 or -1 along with status of like.
     */
    function handleNumLikeHelper(signLike: number) {
        const updatedNumLikes = numLike+signLike;
        localStorage.setItem(`${props.photoId}_numLikes`, updatedNumLikes.toString());
        setNumLike(updatedNumLikes);
    }

    /**
     * 
     * @returns Display "Like" or "Liked" along with user click "Like" button
     */
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
            <CardContent className="body-content">
                <div>
                    <Typography className="rover-name" variant="body1" color="text.secondary">
                        {props.roverName} rover - {props.cameraName}
                    </Typography>
                </div>
                <div>
                    <Typography className="earth-date-info" variant="body2" color="text.secondary">
                        {props.earthDate}
                    </Typography>
                </div>                    
            </CardContent>
            <Button className="like-button" variant="contained" onClick={handleNumLike}>
                {liked === false ? <ThumbUpIcon className="thumb-icon" /> : <CheckIcon className="check-icon" />}
                {showLikeMessage()}:{numLike}
            </Button>
        </Card>
    )
}

export default PhotoComponent;
