import React, {useEffect} from 'react';
import './css/error.css';

const NoTrailer = (props) => {
    const style = {
        backgroundColor: 'black',
    }
    useEffect(() => {
        props.setIsLoad(false);
    })
    return(
        <div className = 'error-img animated animate infinite' style={style}>
            <h1>No Trailer Found !</h1>           
        </div>
    )
}

export default NoTrailer;