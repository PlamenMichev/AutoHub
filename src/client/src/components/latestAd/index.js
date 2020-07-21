import React from 'react';
import styles from './index.module.css';

const LatestAd = ({ adInfo }) => {
    adInfo.createdOn = new Date(adInfo.createdOn); 
    const timeSince = Math.abs(new Date() - adInfo.createdOn);
    const timeInDays = Math.ceil(timeSince / (1000 * 60 * 60 * 24));
    return (
        <div className={styles.card + ' row'}>
        <div className='col-md-3'>
            <img className={styles.image} src={adInfo.photosUrls[0]} />
        </div>
        <div className='col-md-9'>
            <div className={styles['header-div'] + ' row'}>
                <h5 className='col-md-7'>Price: {adInfo.price}</h5>
                <span className={styles.time + ' col-md-5'}>{timeInDays} {timeInDays == 1 ? 'day' : 'days'} ago</span>
            </div>
            <h6>{adInfo.title}</h6>
            <h6>Type: {adInfo.type}</h6>
            <span>{adInfo.description.toString().substr(0, 25)}...</span>
        </div>
        </div>
    )
}

export default LatestAd;