import React, { useState, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Spinner from '../../components/spinner';
import globalConstants from '../../global-constants';
import AdDetailsImage from '../../components/ad-details-image';
import styles from './index.module.css';

const AdDetails = (props) => {
    const [ad, setAd] = useState(null);

    useEffect(() => {
        const pathname = props.location.pathname;
        const id = pathname.substring(pathname.lastIndexOf('/') + 1);
        fetch(`${globalConstants.serverUrl}/ads/${id}`)
            .then(promise => {
                return promise.json();
            })
            .then(response => {
                setAd(response);
            });
    }, [])

    if (!ad) {
        console.log('asdasdasd');
        return (
            <Spinner />
        )
    }

    return (
        <PageLayout>
        <div className="container">
            <h1 className="my-4">{ad.title}
                <small>          {ad.price} {ad.price !== 'Negotiable' ? 'lv' : ''}</small>
            </h1>
            <div className="row">
                <AdDetailsImage images={ad.photosUrls}/>

                <div className="col-md-4">
                <h3 className="my-3">Description</h3>
                <p>{ad.description}</p>
                <h3 className="my-3">Details</h3>
                <ul>
                    <li>Make: { ad.make }</li>
                    <li>Model: { ad.make }</li>
                    <li>Transmission: { ad.transmission }</li>
                    <li>Fuel: {ad.fuelType}</li>
                    <li>Manufacture Year: {globalConstants.months[new Date(ad.manufactureDate).getMonth()]} {new Date(ad.manufactureDate).getFullYear()}</li>

                    
                    <li>Distance Run: { ad.distanceRun !== '' ? ad.distanceRun : 'Not filled' }</li>
                    <li>Horsepower: { ad.horsepower !== '' ? ad.horsepower : 'Not filled' }</li>
                    <li>Color: { ad.color !== '' ? ad.color : 'Not filled' }</li>
                    <li>Type: { ad.type !== '' ? ad.type : 'Not filled' }</li>
                   
                </ul>
                </div>

            </div>

        </div>
        </PageLayout>)

            {/* <div className={styles.wrapper}>
                <h1>{ car.title }</h1>
            </div> */}
}

export default AdDetails;