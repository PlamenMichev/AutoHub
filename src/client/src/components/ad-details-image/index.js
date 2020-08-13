import React, { useState } from 'react';
import styles from './index.module.css';

const AdDetailsImage = ({ images, onClick }) => {
    return (    
        <div className="col-md-8">
            {images.map((image, index) => {
                if (index === 0) {
                    return (<div key={index}>
                        <img onClick={onClick} className={'img-fluid ' + styles.main} src={image} alt="Car Image" index={index}/>
                    </div>)
                } else {
                    return (<div key={index} className={styles['image-wrapper']}>
                        <img onClick={onClick} className={'img-fluid ' + styles.image} src={image} alt="Car Image" index={index}/>
                    </div>)
                }
            })}
        </div>
        
    )
}

export default AdDetailsImage;