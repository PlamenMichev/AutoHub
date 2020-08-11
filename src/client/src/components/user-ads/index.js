import React from 'react';
import UserAd from '../user-ad';
import styles from './index.module.css';

const UserAds = ({ ads }) => {

    const renderAds = () => {
        return ads.map(ad => {
                return <UserAd 
                        key={ad._id}
                        ad={ad}
                        />
            })
    }

    return (
        <div>
            { renderAds() }
        </div>
    )
}

export default UserAds;