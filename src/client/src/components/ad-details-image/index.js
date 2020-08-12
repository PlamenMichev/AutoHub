import React from 'react';
import styles from './index.module.css';

const AdDetailsImage = ({ images }) => {
    return (    
        <div className="col-md-8">
            <img className={'img-fluid ' + styles.image} src={images[0]} alt="" />
        </div>
    )
}

export default AdDetailsImage;