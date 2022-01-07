import React, { Component }from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

type NasaState = {
    searchWord: string;
    dataList: Array<dataType>;
};

type dataType = {
    id: number;
    sol: number;
}

const Nasa: React.FC = () => {
    // constructor(props) {
    //     super(props);

    const [searchWord, setSerachWord] = React.useState("");
    const [dataList, setDataList] = React.useState([]);
    const api = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=fhaz&sol=1000&api_key=fh6cef5302XFOLsSDXRQPWEj8cZaMMWhrkhP7YCS`;

    // function fetchApi() {
    //     console.log("here??");
    //     fetch(api)
    //         .then(r => r.json())
    //         .then(data => {
    //             console.log(data["photos"])
    //             this.setState({
    //                 // dataList: [...data["photos"]]
    //                 dataList: data["photos"].map((item: { id: any; sol: any; }) => ({
    //                     id: item.id,
    //                     sol: item.sol
    //                 }))
    //             })
    //         })
    //     console.log(this.state.dataList)
    // }
    React.useEffect(() => {
        axios.get(api).then(
          (response) => {
            setDataList(response.data);  
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
/*
    .then((data) => {
      this.setState({
        items: data.map(item => ({
            title: item.title,
            url: item.url,
            descrip: item.bite,
        })
      });
      console.log(data[i]) 

*/

    return (
        <div>
            Hello {searchWord}
            {/* <Button variant="text" onClick={() => this.fetchApi()}>Text</Button> */}
            {console.log(dataList)}
        </div>
    )
}

export default Nasa;

// import React, { Component }from 'react';
// import { Button } from '@mui/material';

// type NasaState = {
//     searchWord: string;
//     dataList: Array<dataType>;
// };

// type dataType = {
//     id: number;
//     sol: number;
// }

// class Nasa extends Component<{}, NasaState> {
//     // constructor(props) {
//     //     super(props);

//     state: NasaState = {
//         searchWord: "",
//         dataList: []
//     };
//     // componentDidMount() {
//     //     if (!this.props.keyword) {
//     //         console.log("here??");
//     //         const api = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=${this.props.keyword}&sol=1000&api_key=fh6cef5302XFOLsSDXRQPWEj8cZaMMWhrkhP7YCS`
//     //         fetch(api)
//     //             .then(r => r.json())
//     //             .then(data => {
//     //                 console.log(data)
//     //                 this.setState({
//     //                     dataList: [...data]
//     //                 })
//     //         })
//     //     }
//     // }

//     fetchApi() {
//         console.log("here??");
//         const api = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=fhaz&sol=1000&api_key=fh6cef5302XFOLsSDXRQPWEj8cZaMMWhrkhP7YCS`;
//         fetch(api)
//             .then(r => r.json())
//             .then(data => {
//                 console.log(data["photos"])
//                 this.setState({
//                     // dataList: [...data["photos"]]
//                     dataList: data["photos"].map((item: { id: any; sol: any; }) => ({
//                         id: item.id,
//                         sol: item.sol
//                     }))
//                 })
//             })
//         console.log(this.state.dataList)
//     }
// /*
//     .then((data) => {
//       this.setState({
//         items: data.map(item => ({
//             title: item.title,
//             url: item.url,
//             descrip: item.bite,
//         })
//       });
//       console.log(data[i]) 

// */

//     render() {
//         return (
//             <div>
//                 Hello {this.state.searchWord}
//                 <Button variant="text" onClick={() => this.fetchApi()}>Text</Button>

//             </div>
//         )
//     }
// }

// export default Nasa;