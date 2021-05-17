import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './css/trailer.css';
import YouTube from 'react-youtube';
import { useLoading, Puff } from '@agney/react-loading';
import Error from './error';
import NoTrailer from './notrailer';

export default function Trailer(props) {
    const [data,setData] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [error, setError] = useState(false);

    const { containerProps, indicatorEl } = useLoading({
      loading: true,
      indicator: <Puff width="70" />,
      loaderProps: {
        // Any props here would be spread on to the indicator element.
        style: { color : 'white', }
      }
    });

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        rows: 1,
        beforeChange: () => {
            setIsLoad(true);
        },
        afterChange: () => {
          setIsLoad(false)
        }
    }

    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        enablejsapi: 1,
        origin: window.location.origin
      }
    }

    const handleClick = () => {
      setIsLoad(true);
      props.handleClick();
    }

    const _onReady = async () => {
          setIsLoad(false);
    }

    const errorHandle = () => {
      setError(true);
    }
    
    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${props.data}/videos?api_key=32cd16f037bba76b28b59eee2f1cd7a3`)
            .then(response => {
                setData(response.data.results);
                setError(false);
            })
            .catch(err => {
              console.error(err);
              setError(true);
            });
    },[props.data]);
    return(
      <>
      {!props.isShow ? '' :
          <div className="trailer animated-trailer">
            { isLoad &&
                  <div className = 'loading'>
                      <section {...containerProps}>
                          {indicatorEl}
                      </section> 
                  </div>
            }
            <button type="button" onClick={()=>handleClick()}></button> 
            <Slider {...settings}>
                {data.length === 0 ? <NoTrailer setIsLoad={setIsLoad}></NoTrailer> : data.map(data =>{
                    return(
                        <div className = 'item-video' key={data.id}>
                          {error ? <Error></Error> :
                             <YouTube videoId={data.key} opts = {opts} className='video' onReady = {() => _onReady()} onError = {() => errorHandle()}></YouTube>
                          }
                        </div>
                    )
                })}
            </Slider>
          </div>
      }
      </> 
    )
}