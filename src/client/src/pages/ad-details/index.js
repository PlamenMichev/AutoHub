import React, { useState, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Spinner from '../../components/spinner';
import globalConstants from '../../global-constants';
import AdDetailsImage from '../../components/ad-details-image';
import styles from './index.module.css';
import ImageModal from '../../components/image-modal';
import UserInfo from '../../components/userInfo';

const AdDetails = (props) => {
    const [ad, setAd] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [clickedImage, setClickedImage] = useState(false);
    const [clickedImageIndex, setClickedImageIndex] = useState(false);

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

    const PreviousImage = () => {
        const index = clickedImageIndex - 1;
        setClickedImage(ad.photosUrls[index]);
        setClickedImageIndex(index);
    }

    const NextImage = () => {
        const index = clickedImageIndex + 1;
        setClickedImage(ad.photosUrls[index]);
        setClickedImageIndex(index);
    }

    const onPhotoClick = (event) => {
        const index = +event.target.getAttribute('index');
        setClickedImage(ad.photosUrls[index]);
        setClickedImageIndex(index);
        setModalShow(true);
    }

    if (!ad) {
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
            <div className={`row ${styles.wrapper}`}>
                <AdDetailsImage images={ad.photosUrls} onClick={onPhotoClick} />

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

                        <li>Distance Run: { ad.distanceRun !== 0 ? ad.distanceRun : 'Not filled' }</li>
                        <li>Horsepower: { ad.horsepower !== 0 ? ad.horsepower : 'Not filled' }</li>
                        <li>Color: { ad.color !== '' ? ad.color : 'Not filled' }</li>
                        <li>Type: { ad.type !== '' ? ad.type : 'Not filled' }</li>
                    
                    </ul>

                    <UserInfo user={ad.adPlacer}/>

                </div>
            </div>
        </div>

        <ImageModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            image={clickedImage}
            previousImage={clickedImageIndex > 0 ? PreviousImage : null}
            nextImage={clickedImageIndex < ad.photosUrls.length - 1 ? NextImage : null}
        />

        </PageLayout>)
}

export default AdDetails;