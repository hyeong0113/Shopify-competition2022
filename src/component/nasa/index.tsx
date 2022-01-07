import React from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

type NasaState = {
    searchWord: string;
    dataList: Array<dataType>;
};

type dataType = {
    id: number;
    sol: number;
}

const Nasa: React.FC = () => {
    const [searchWord, setSerachWord] = React.useState("");
    const [dataList, setDataList] = React.useState([]);
    const api = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=fhaz&sol=1000&api_key=fh6cef5302XFOLsSDXRQPWEj8cZaMMWhrkhP7YCS`;

    React.useEffect(() => {
        axios.get(api).then(
          (response) => {
            setDataList(response.data["photos"]);  
          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
              setDataList(_content);
          }
        );
      }, []);

    return (
        <div>
            {/* <Button variant="text" onClick={() => this.fetchApi()}>Text</Button> */}
            {dataList.map((photo, photoKey) => (
                <div key={photoKey}>
                    <Card sx={{ maxWidth: 345 }} style={{marginBottom: 10}}>
                        <CardMedia
                            component="img"
                            height="194"
                            image={photo["img_src"]}
                            alt="space-photo"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {photo["rover"]["name"]} rover - {photo["camera"]["full_name"]}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default Nasa;
