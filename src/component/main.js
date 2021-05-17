import React, {useState, useEffect} from 'react';
import Cart from './cart';
import SearchInput from './search';
import axios from 'axios';
import './css/main.css';
import Error from './error';

function MainComponent() {
    const [currentData, setData] = useState({
        data : {
            id : 157336,
            backdrop_path: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
            poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
        }
    });
    const [style,setStyle] = useState({
        backgroundImage : null
    })
    const [err,setErr] = useState(false);
    //API The movie database
    function axiosAPI(url) {
        axios
            .get(url)
            .then(response => {
                setData({
                    data : response.data
                })
                setErr(false);
            })
            .catch(error => {
                console.error(error);
                setErr(true);
            });
    }
    function axiosMoviesId(movieId) {
        let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=32cd16f037bba76b28b59eee2f1cd7a3`;
        axiosAPI(url);
    }
    useEffect(() => {
        let url = `https://api.themoviedb.org/3/movie/${currentData.data.id}?api_key=32cd16f037bba76b28b59eee2f1cd7a3`;
        axiosAPI(url);
        setStyle({
            backgroundImage : `url('https://image.tmdb.org/t/p/original${currentData.data.backdrop_path}')`,
        })
    },[currentData.data.id,currentData.data.backdrop_path]);
    if(err) {
        return(
            <Error></Error>
        )
    }
    else return(
        <div style={style} className='main'>
            <SearchInput axiosMoviesId = {axiosMoviesId}></SearchInput>
            <Cart data = {currentData}></Cart>   
        </div>
    )
}
export default MainComponent;
