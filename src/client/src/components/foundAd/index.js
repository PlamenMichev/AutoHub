import React from 'react';
import styles from './index.module.css';
import { Row, Col } from 'react-bootstrap';
import CarListImage from '../car-list-image';
import { Link } from 'react-router-dom';

const FoundAd = ({ adInfo }) => {

    const renderCarPhotos = () => {
        const imagesToShow = adInfo.photosUrls.slice(0, 9);
        return imagesToShow.map((image, index) => {
            let main = false;
            if (index === 0) {
                main = true;
            }
            return <CarListImage key={image} imageUrl={image} main={main} />
        })
    }

    return (
        <Link to={`/ad/${adInfo.id}`} className={styles.wrapper}>
            <div className={styles.ad}>
                <Row>
                    <Col>
                        { renderCarPhotos() }
                    </Col>
                    <Col>
                        <h3>{adInfo.title}</h3>
                        <span>{adInfo.length < 100 
                            ? adInfo.description.substring(0, 100) + '...' 
                            : adInfo.description.substring(0, 100)}</span>
                    </Col>
                    <Col>
                        <h3>{adInfo.price} lv.</h3>
                        <hr />
                        <span className={styles.info}>{adInfo.make} {adInfo.model} {adInfo.type ? ' - ' + adInfo.type : ''}</span>
                    </Col>
                </Row>
            </div>
        </Link>
    )
}

export default FoundAd;