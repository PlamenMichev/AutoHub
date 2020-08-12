import React from 'react';
import FoundAd from '../foundAd';
import NoAds from '../no-ads';
import styles from './index.module.css';

const FoundAds = ({ ads }) => {

    const renderFoundAds = () => {
        return ads.map(ad => {
            const adInfo = {
                title: ad.title,
                description: ad.description,
                make: ad.make,
                model: ad.model,
                price: ad.price,
                createdOn: ad.createdOn,
                type: ad.type,
                photosUrls: ad.photosUrls,
                id: ad._id,
            }

            return (
                <FoundAd key={ad._id} adInfo={adInfo}>
                </FoundAd>
            )
        });
    }

    return (
        <div className={styles.container}>
            {ads.length === 0 ? <NoAds /> : renderFoundAds()}
        </div>
    )
}

export default FoundAds;