import React from 'react';
import styles from './index.module.css';

const CarListImage = ({ imageUrl, main = false }) => {
    let className = 'image';
    if (main) {
        className = 'main-image';
    }
    return (
        <img className={styles[className]} src={imageUrl}/>
    )
}

export default CarListImage;