import React, {useState} from 'react';
import './css/cart.css';
import Trailer from './trailer';
import defaultCartPoster from '../img/defaultCartPoster.gif';

function Cart(props) {
    const data = props.data.data;
    const [isShow, setIsShow] = useState(false);
    const handleClick = () => {
        setIsShow(!isShow);
    }
    return(
        <>
            <div className = 'main-cart animated'>
                <div className = 'cart-poster'>
                    <img src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : defaultCartPoster} alt={data.title}/>
                </div>
                <div className = 'cart-info'>
                    <h1>{data.title}</h1>
                    <span className="tagline">{data.tagline}</span>
                    <p className='overview'>{data.overview}</p>
                    <div className="additional-details">
                        <span className="genre-list">{
                            data.genres === undefined ? '' : data.genres
                                .map(item =>{
                                    return item.name;
                                })
                                .join(', ')
                        }</span>
                        <span className="production-list">{
                            data.production_companies === undefined ? '' : data.production_companies
                            .map(item =>{
                                return item.name;
                            })
                            .join(', ')
                        }</span>
                        <div className="release-details">
                            <div className="release-details-left">
                                <div className="release-details-item">
                                    Release:
                                    <span className="meta-data">{data.release_date}</span>
                                </div>
                                <div className="release-details-item">
                                    Box Office:
                                    <span className="meta-data">{'$' + new Intl.NumberFormat("en-emodeng").format(data.revenue)}</span>
                                </div>
                            </div>
                            <div className="release-details-right">
                                <div className="release-details-item">
                                    Running Time:
                                    <span className="meta-data">{data.runtime ? data.runtime + ' Minutes' : "NaN"}</span>
                                </div>
                                <div className="release-details-item">
                                    Vote Average:
                                    <span className="meta-data">{data.vote_average ? data.vote_average : 'NaN'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="trailer-btn">
                            <button type="button" onClick={() => {handleClick()}}>Watch Trailer</button>
                        </div>
                    </div>
                </div>
            </div>
            <Trailer isShow = {isShow} data={data.id} handleClick={handleClick}></Trailer>
        </>
    )
}

export default Cart;