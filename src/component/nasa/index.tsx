import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField } from '@mui/material';

import PhotoComponent from '../photoContent';

const ROVER_LIST = [
    {key: "curiosity", name: "Curiosity"},
    {key: "opportunity", name: "Opportunity"},
    {key: "spirit", name: "Spirit"}
];

const CAMERA_LIST = [
    {key: "fhaz", name: "FHAZ"},
    {key: "rhaz", name: "RHAZ"},
    {key: "mast", name: "MAST"},
    {key: "chemcam", name: "CHEMCAM"},
    {key: "mahli", name: "MAHLI"},
    {key: "mardi", name: "MARDI"},
    {key: "navcam", name: "NAVCAM"},
    {key: "pancam", name: "PANCAM"},
    {key: "minites", name: "MINITES"}
]

const Nasa: FC = () => {
    const [roverKey, setroverKey] = useState("");
    const [roverInfo, setRoverInfo] = useState([]);
    const [maxSol, setMaxSol] = useState(0);
    const [sol, setSol] = useState(0);

    const [dataList, setDataList] = useState([]);

    const api = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverKey}/photos?camera=fhaz&sol=${sol}&api_key=fh6cef5302XFOLsSDXRQPWEj8cZaMMWhrkhP7YCS`;
    const roverNameapi = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverKey}?api_key=fh6cef5302XFOLsSDXRQPWEj8cZaMMWhrkhP7YCS`;

    // Fetch rover info with given rover name
    useEffect(() => {
        if (roverKey !== "") {
            fetchRoverInfo(roverKey, roverNameapi);
        }
        else {
            return;
        }
    }, [roverKey]);

    // Fetch list of photos with given values
    useEffect(() => {
        if (roverKey !== "") {
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
        }
        else {
            return;
        }
    }, [roverKey, sol]);

    function fetchRoverInfo(roverKey: string, apiUrl: string) {
        axios.get(roverNameapi).then(
            (response) => {
                setRoverInfo(response.data["photo_manifest"]);
                setMaxSol(response.data["photo_manifest"]["max_sol"]);
            },
            (error) => {
                const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
                setDataList(_content);
            }
        );
    }

    function handleRoverKeyChange(event: SelectChangeEvent) {
        setroverKey(event.target.value as string);
    }

    function handleSolChange(event: ChangeEvent<HTMLInputElement>) {
        setSol(Number(event.target.value));
    }

    return (
        <div>
            {/* <Button variant="text" onClick={() => this.fetchApi()}>Text</Button> */}
            <div className="input-form">
                <FormControl fullWidth>
                    <InputLabel id="rover-key-select-label">Select Rover</InputLabel>
                    <Select
                        labelId="rover-key-select-label"
                        id="rover-key-select"
                        value={roverKey}
                        label="roverKey"
                        onChange={handleRoverKeyChange}
                    >
                        {ROVER_LIST.map((e, k) => (
                            <MenuItem key={k} value={e.key}>{e.name}</MenuItem>
                        ))}
                    </Select>
                    {maxSol !== 0 ? 
                        <TextField
                            id="sol-form"
                            type="number"
                            label="Outlined"
                            variant="outlined"
                            value={sol}
                            placeholder={`Type 0~${maxSol}`}
                            onChange={handleSolChange}
                        />                    
                        : null
                    }

                </FormControl>
            </div>
            <div className="content-body">
                {dataList.map((photo, photoKey) => (
                    <div key={photoKey}>
                        <PhotoComponent
                            image={photo["img_src"]}
                            roverName={photo["rover"]["name"]}
                            cameraName={photo["camera"]["full_name"]}
                            earthDate={photo["earth_date"]}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Nasa;

/**
 * camera: FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM, PANCAM, MINITES
 * 
 * 
 * rover name: Curiosity, Opportunity, Spirit
 * 
 * 
 * https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=fh6cef5302XFOLsSDXRQPWEj8cZaMMWhrkhP7YCS
 */