import React from 'react';
import styles from './index.module.css';

const CarListImage = ({ imageUrl }) => {
    return (
        <img className={styles.image} src={imageUrl}/>
    )
}

export default CarListImage;