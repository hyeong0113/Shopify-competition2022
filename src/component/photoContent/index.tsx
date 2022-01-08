import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

type PhotoContentProps = {
    image: string;
    roverName: string;
    cameraName: string;
    earthDate: Date;
    photoId: number;
}

const PhotoComponent = (props: PhotoContentProps) => {
    let [numLike, setNumLike] =  useState(0);
    const [liked, setLiked] = useState(false);

    console.log(`check loaded?? ${window.localStorage.getItem(`${props.photoId}_numLikes`)}`);
    // Fetch rover info with given rover name
    useEffect(() => {
        if (!window.localStorage.getItem(`${props.photoId}_numLikes`)) {
            console.log("처음봄");
            return;
        }
        else {
            console.log("seen");
            setNumLike(Number(window.localStorage.getItem(`${props.photoId}_numLikes`)));
        }
    }, []);

    function handleLiked() {
        console.log(`Before clicked ${liked}`);
        setLiked(!liked);
        console.log(`After clicked ${liked}`);

        if (!liked) {
            console.log("incerase");
            setNumLike(numLike+1);
            localStorage.setItem(`${props.photoId}_numLikes`, numLike.toString());

            console.log(numLike);
            console.log(Number(window.localStorage.getItem(`${props.photoId}_numLikes`)));
        }
        else {
            console.log("decrease");
            setNumLike(numLike-1);
            localStorage.setItem(`${props.photoId}_numLikes`, numLike.toString());

            console.log(numLike);
            console.log(Number(window.localStorage.getItem(`${props.photoId}_numLikes`)));
        }
    }

    // function handleNumLike(scale: number) {
    //     console.log(`Before calc ${numLike}`);
    //     setNumLike(numLike+scale);
    //     console.log(`After calc ${numLike}`);

    //     localStorage.setItem(`${props.photoId}_numLikes`, numLike.toString());
    // }

    // Dispkay message: "Like" or "Liked"
    function showLikeMessage() {
        if (liked) {
            return "Liked";
        }
        else {
            return "Like"
        }
    }

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
            <Button variant="contained" onClick={handleLiked}>{showLikeMessage()} {numLike}</Button>
        </Card>
    )
}

export default PhotoComponent;
