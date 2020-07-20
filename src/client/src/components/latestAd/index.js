import React from 'react';
import styles from './index.module.css';

const LatestAd = ({ adInfo }) => {
    adInfo.createdOn = new Date(adInfo.createdOn); 
    const timeSince = Math.abs(new Date() - adInfo.createdOn);
    const timeInDays = Math.ceil(timeSince / (1000 * 60 * 60 * 24));
    console.log(adInfo.photosUrls[0]);
    return (
        <div>
            <div>
                {/* <img className={styles.image} src={adInfo.photosUrls[0][0]} /> */}
            </div>
            <div className={styles['header-div']}>
                <h5 className='col-md-9'>Price: {adInfo.price}</h5>
                <span className={styles.time + ' col-md-9'}>{timeInDays} {timeInDays == 1 ? 'day' : 'days'}</span>
            </div>
            <h6>{adInfo.title}</h6>
        </div>
    )
}

export default LatestAd;