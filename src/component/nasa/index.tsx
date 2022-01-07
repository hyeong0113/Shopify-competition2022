import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import PhotoComponent from '../photoContent';

const Nasa: FC = () => {
    const [searchWord, setSerachWord] = useState("");
    const [dataList, setDataList] = useState([]);
    const api = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=fhaz&sol=1000&api_key=fh6cef5302XFOLsSDXRQPWEj8cZaMMWhrkhP7YCS`;

    useEffect(() => {
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
                    <PhotoComponent image={photo["img_src"]} roverName={photo["rover"]["name"]}
                                    cameraName={photo["camera"]["full_name"]} earthDate={photo["earth_date"]} />
                </div>
            ))}
        </div>
    )
}

export default Nasa;
